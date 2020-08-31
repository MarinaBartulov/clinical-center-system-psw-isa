package team57.project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team57.project.dto.*;
import team57.project.model.*;
import team57.project.repository.DoctorRepository;
import team57.project.repository.RoomRepository;
import team57.project.repository.TermDoctorRepository;
import team57.project.repository.TermRoomRepository;
import team57.project.service.RoomService;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private ClinicServiceImpl clinicService;
    @Autowired
    private TermDoctorRepository termDoctorRepository;
    @Autowired
    private TermRoomRepository termRoomRepository;
    @Autowired
    private DoctorRepository doctorRepository;

    public String updateRoom(Room room, RoomDTO roomDTO, Long idClinic){

        List<TermRoom> scheduledTerms = roomRepository.findScheduledTerms(room.getId(), LocalDate.now(), LocalTime.now());
        if(scheduledTerms.size() != 0){
            return "This room can't be updated because it is reserved " +
                    "for the upcoming exam or surgery.";
        }

                Clinic clinic = clinicService.findOne(idClinic);
                Set<Room> rooms = clinic.getRooms();
                for(Room r: rooms){
                    boolean exists = false;
                    String msg = "";
                    if(r.getName().equals(roomDTO.getName()) && r.getId() != room.getId() && !r.isRemoved()){
                        exists = true;
                        msg += "This room can't be updated because this name already exists in the clinic. ";
                    }
                    if(r.getNumber().equals(roomDTO.getNumber()) && r.getId() != room.getId() && !r.isRemoved()){
                        exists = true;
                        msg += "This room can't be updated because this number already exists in the clinic. ";
                    }
                    if(exists){
                        return msg;
                    }
                }
                room.setName(roomDTO.getName());
                room.setNumber(roomDTO.getNumber());
                room.setRoomType(roomDTO.getRoomType());
                roomRepository.save(room);

        return null;
    }

    public boolean removeRoom(Room room){

        List<TermRoom> scheduledTerms = roomRepository.findScheduledTerms(room.getId(), LocalDate.now(), LocalTime.now());
        if(scheduledTerms.size() != 0){
            return false;
        }

        room.setRemoved(true);
        roomRepository.save(room);
        return true;
    }

    public Room findOne(Long id){

        return (Room) roomRepository.findById(id).orElse(null);
    }

    @Override
    public List<RoomFA> findAvailableRooms(Clinic clinic, AvailableRoomRequest arq) {
        List<RoomFA> roomsFA = new ArrayList<RoomFA>();
        List<Room> rooms = new ArrayList<Room>();
        rooms = roomRepository.getAvailableRooms(clinic.getId(),arq.getDate(),arq.getTime());
        for(Room room: rooms){
            roomsFA.add(new RoomFA(room));
        }
        return roomsFA;
    }

    @Override
    public List<RoomME> findRoomsFreeTerms(Clinic clinic, FreeTermsRequest ftr) {
        //roomName, roomNumber, idDoctor, date

        List<Room> foundRooms = new ArrayList<Room>(); //rooms with desired name and number
        List<RoomME> foundRoomsME = new ArrayList<RoomME>();
        //if name and number haven't been entered, find all rooms
        if((ftr.getRoomName().equals("") || ftr.getRoomName()==null) && (ftr.getRoomNumber().equals("") || ftr.getRoomNumber()==null)){
            foundRooms = roomRepository.findRooms(clinic.getId());
        }else{
            foundRooms = searchRooms(clinic.getId(),ftr.getRoomName(),ftr.getRoomNumber());
        }

        //retrieve free terms for the room during doctor's working hours
        //retrieve free terms for the doctor on that day
        //sort the terms in ascending order, and then go from the beginning of the list and check if the doctor has that free term too
        Doctor d = doctorRepository.findDoctor(ftr.getIdDoctor());
        List<TermDoctor> termsDoctors = termDoctorRepository.findFreeTermsDate(ftr.getIdDoctor(),ftr.getDate());
        termsDoctors.sort(Comparator.comparing(TermDoctor::getStartTime));
        LocalTime startWorkHours = d.getWorkingHoursStart();
        LocalTime endWorkHours = d.getWorkingHoursEnd();

        for(Room room: foundRooms){
            List<TermRoom> termsRoom = termRoomRepository.findFreeTermsDate(room.getId(),ftr.getDate(),startWorkHours,endWorkHours);
            termsRoom.sort(Comparator.comparing(TermRoom::getStartTime));
            for(TermRoom tr:termsRoom){
                if(doctorTermExists(tr.getStartTime(),termsDoctors)){
                    foundRoomsME.add(new RoomME(room,tr));
                    break;
                }
            }
        }
        return foundRoomsME;
    }

    private boolean doctorTermExists(LocalTime start,List<TermDoctor> termsDoctor){

        for(TermDoctor td: termsDoctor){
            if(td.getStartTime().equals(start)){
                return true;
            }
        }
        return false;
    }



    private List<Room> searchRooms(Long clinicId, String roomName,String roomNumber) {

        List<Room> foundRooms = new ArrayList<Room>();
        List<Room> rooms = roomRepository.findRooms(clinicId);
        for(Room room : rooms){
            boolean nameCorrect = true;
            boolean numberCorrect = true;
            if(!roomName.equals("") && roomName != null){
                if(room.getName().toLowerCase().contains(roomName.toLowerCase())){
                    nameCorrect = true;
                }else{
                    nameCorrect = false;
                }
            }
            if(!roomNumber.equals("") && roomNumber != null){
                if(room.getNumber().toLowerCase().contains(roomNumber.toLowerCase())){
                    numberCorrect = true;
                }else{
                    numberCorrect = false;
                }
            }
            if(nameCorrect && numberCorrect){
                foundRooms.add(room);
            }
        }
        return foundRooms;

    }

    @Override
    public List<TermRoomDTO> getReservedRoomTerms(Room room) {

        List<TermRoom> termsRoom = termRoomRepository.getReservedRoomTerms(room.getId());
        List<TermRoomDTO> termsRoomDTO = new ArrayList<TermRoomDTO>();
        for(TermRoom tr: termsRoom){
            termsRoomDTO.add(new TermRoomDTO(tr));
        }
        return termsRoomDTO;
    }


}
