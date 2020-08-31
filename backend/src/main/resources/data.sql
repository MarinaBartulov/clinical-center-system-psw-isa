-- noinspection SqlNoDataSourceInspectionForFile
insert into authority (name) value ('ROLE_CLINICAL_CENTER_ADMIN');
insert into authority (name) value ('ROLE_CLINIC_ADMIN');
insert into authority (name) value ('ROLE_PATIENT');
insert into authority (name) value ('ROLE_DOCTOR');
insert into authority (name) value ('ROLE_NURSE');

insert into clinical_center(name) value ('Dr Cvjetkovic');
insert into diagnosis (code, description) values ('#00000023', 'Sinusitis');
insert into diagnosis (code, description) values ('#0B048020', 'Pneumonia');
insert into diagnosis (code, description) values ('#A0000023', 'Gastritis');
insert into diagnosis (code, description) values ('#ABC00800', 'Cystitis');
insert into medical_record (organ_donor,height,weight,diopter,blood_type,date_of_birth) value ('Yes',182,70,'L-0; R-0','A-','04.09.1997.');
insert into clinic (name, address,description,rating,number_of_reviews) value ('Neurology', 'Narodnog Fronta 76 Novi Sad', 'Clinic of Neurology',4.5,10);
insert into clinic (name, address,description,rating,number_of_reviews) value ('Rehabilitation', 'Bulevar Oslobodjenja 33 Novi Sad', 'Rehabilitation Clinic',3,1);
insert into clinic (name, address,description,rating,number_of_reviews) value ('Pulmonology', 'Brace Ribnikar 49 Novi Sad', 'Pulmonology Clinic',4,2);
insert into clinic (name, address,description,rating,number_of_reviews) value ('Cardiology', 'Kralja Petra 37 Novi Sad', 'Cardiology Clinic',5,25);

/*
 These emails are not real. If you want to check the notification messages for the users, change their emails.
 For patient registration you have to use a real email, because you have to activate your account by clicking on a link sent in the email.
 Clinical center admin - email: mika@something.com, password: mika
 Clinic admin - email: zika@something.com, password: zika
 Doctor - email: petar@something.com, password: petar
 Nurse - email: mira@something.com, password: mira
 Patient - email: pera@something.com, password: pera
 */


insert into user (name, surname, email, password, address, city, country, phone_number, serial_number,number_of_reviews, rating, activated_account, enabled, last_password_reset_date, password_changed, working_hours_start, working_hours_end, removed, type, version) values ('Mika', 'Mikic', 'mika@something.com','$2a$10$.iwB3NV6S83aXegd8HmYweflprG3x8lMvXMevv1oYEtmnArEaE1iW','Alekse Santica 47','Novi Sad','Serbia','0635984156','032163256332',-1,-1,-1,TRUE,'2019-11-19 04:00:00',FALSE,'06:00', '14:00',FALSE,'CLINICAL_CENTER_ADMIN',0);
insert into user (name, surname, email, password, address, city, country, phone_number, serial_number,number_of_reviews, rating, activated_account, enabled, last_password_reset_date, password_changed,clinic_id, working_hours_start, working_hours_end, removed, type, version) values ('Zika', 'Zikic', 'zika@something.com','$2a$10$laKrspGgEPZFXKWh6R0v3O7HGV7FCOYCgFvCtKCPseId0jk.glGY6','Kralja Petra 21','Novi Sad','Serbia','0635984156','032163256332',-1,-1,-1,TRUE,'2019-11-19 04:00:00',FALSE,1,'06:00', '14:00',FALSE,'CLINIC_ADMIN',0);
insert into user (name, surname, email, password, address, city, country, phone_number, serial_number, number_of_reviews, rating, activated_account, enabled, last_password_reset_date, password_changed, working_hours_start, working_hours_end, removed, clinic_id, type, version) values ('Petar', 'Petrovic', 'petar@something.com','$2a$10$.4TlEcGSbL2ibKLkKMBqo.otZTShm8UqMjkpOK3Lpl42y3BH0m56q','Bulevar Oslobodjenja 2','Novi Sad','Serbia','0635984156','032163256332',0,0,-1,TRUE,'2019-11-19 04:00:00',FALSE, '06:00', '14:00', FALSE, 1, 'DOCTOR',0);
insert into user (name, surname, email, password, address, city, country, phone_number, serial_number,number_of_reviews, rating, activated_account, enabled, last_password_reset_date, password_changed, working_hours_start, working_hours_end, removed, clinic_id, type, version) values ('Mira', 'Miric', 'mira@something.com','$2a$10$KE8DhbZ9044d9fMIDIJopOc70vGQpjGzKjIRWrVlCDiyoSxJGEJ2G','Alekse Santica 47','Gogogljeva 12','Serbia','0635984156','032163256332',-1,-1,-1,TRUE,'2019-11-19 04:00:00',FALSE,'06:00', '14:00', FALSE, 1, 'NURSE',0);
insert into user (name, surname, email, password, address, city, country, phone_number, serial_number,number_of_reviews, rating, activated_account, enabled, last_password_reset_date, password_changed,medical_record_id,working_hours_start, working_hours_end, removed, type, version) values ('Pera', 'Peric', 'pera@something.com','$2a$10$ys.u36Wk7e/9y.dkUb0svOD5I.vaFRtdDwaXQlR5K/O42EYrlWGq6','Danila Kisa 22','Novi Sad','Serbia','0635984156','032163256332',-1,-1,'ACCEPTED',TRUE,'2019-11-19 04:00:00',TRUE,1,'06:00', '14:00', FALSE,'PATIENT',0);

-- Doctors - password: petar
insert into user (name, surname, email, password, address, city, country, phone_number, serial_number,number_of_reviews, rating, activated_account, enabled, last_password_reset_date, password_changed,working_hours_start, working_hours_end, removed, clinic_id, type, version) values ('Nikola', 'Nikolic', 'nikola@something.com', '$2a$10$.4TlEcGSbL2ibKLkKMBqo.otZTShm8UqMjkpOK3Lpl42y3BH0m56q','Alekse Santica 47', 'Novi Sad', 'Serbia', '0635984156', '032163256332', 0, 0, -1, TRUE, '2019-11-19 04:00:00',FALSE, '06:00', '14:00', FALSE, 3, 'DOCTOR',0);
insert into user (name, surname, email, password, address, city, country, phone_number, serial_number, number_of_reviews, rating, activated_account, enabled, last_password_reset_date, password_changed, working_hours_start, working_hours_end, removed, clinic_id, type, version) values ('Jovan', 'Jovanovic', 'jovan@something.com','$2a$10$.4TlEcGSbL2ibKLkKMBqo.otZTShm8UqMjkpOK3Lpl42y3BH0m56q','Alekse Santica 47','Novi Sad','Serbia','0635984156','032163256332',0,0,-1,TRUE,'2019-11-19 04:00:00',FALSE, '06:00', '14:00', FALSE, 1, 'DOCTOR',0);
insert into user (name, surname, email, password, address, city, country, phone_number, serial_number, number_of_reviews, rating, activated_account, enabled, last_password_reset_date, password_changed, working_hours_start, working_hours_end, removed, clinic_id, type, version) values ('Marko', 'Markovic', 'marko@something.com','$2a$10$.4TlEcGSbL2ibKLkKMBqo.otZTShm8UqMjkpOK3Lpl42y3BH0m56q','Alekse Santica 47','Novi Sad','Serbia','0635984156','032163256332',0,0,-1,TRUE,'2019-11-19 04:00:00',FALSE, '06:00', '14:00', FALSE, 1, 'DOCTOR',0);
insert into user (name, surname, email, password, address, city, country, phone_number, serial_number,number_of_reviews, rating, activated_account, enabled, last_password_reset_date, password_changed,working_hours_start, working_hours_end, removed, clinic_id, type, version) values ('Stefan', 'Stefanovic', 'stefan@something.com', '$2a$10$.4TlEcGSbL2ibKLkKMBqo.otZTShm8UqMjkpOK3Lpl42y3BH0m56q','Alekse Santica 47', 'Novi Sad', 'Serbia', '0635984156', '032163256332', 0, 0, -1, TRUE, '2019-11-19 04:00:00',FALSE, '06:00', '14:00', FALSE, 2, 'DOCTOR',0);
insert into user (name, surname, email, password, address, city, country, phone_number, serial_number,number_of_reviews, rating, activated_account, enabled, last_password_reset_date, password_changed,working_hours_start, working_hours_end, removed, clinic_id, type, version) values ('Milan', 'Milanovic', 'milan@something.com', '$2a$10$.4TlEcGSbL2ibKLkKMBqo.otZTShm8UqMjkpOK3Lpl42y3BH0m56q','Alekse Santica 47', 'Novi Sad', 'Serbia', '0635984156', '032163256332', 0, 0, -1, TRUE, '2019-11-19 04:00:00',FALSE, '06:00', '14:00', FALSE, 2, 'DOCTOR',0);
-- Clinic admin - password: zika
insert into user (name, surname, email, password, address, city, country, phone_number, serial_number,number_of_reviews, rating, activated_account, enabled, last_password_reset_date, password_changed,clinic_id, working_hours_start, working_hours_end, removed, type, version) values ('Toma', 'Tomic', 'toma@something.com','$2a$10$laKrspGgEPZFXKWh6R0v3O7HGV7FCOYCgFvCtKCPseId0jk.glGY6','Alekse Santica 47','Novi Sad','Serbia','0635984156','032163256332',-1,-1,-1,TRUE,'2019-11-19 04:00:00',TRUE,1,'06:00', '14:00',FALSE,'CLINIC_ADMIN',0);

-- Patients - password: pera
insert into user (name, surname, email, password, address, city, country, phone_number, serial_number,number_of_reviews, rating, activated_account, enabled, last_password_reset_date, password_changed,medical_record_id,working_hours_start, working_hours_end, removed, type, version) values ('Tara', 'Taric', 'tara@something.com','$2a$10$ys.u36Wk7e/9y.dkUb0svOD5I.vaFRtdDwaXQlR5K/O42EYrlWGq6','Alekse Santica 47','Novi Sad','Serbia','0635984156','032263256332',-1,-1,'ACCEPTED',TRUE,'2019-11-19 04:00:00',TRUE,1,'06:00', '14:00', FALSE,'PATIENT',0);
insert into user (name, surname, email, password, address, city, country, phone_number, serial_number,number_of_reviews, rating, activated_account, enabled, last_password_reset_date, password_changed,medical_record_id,working_hours_start, working_hours_end, removed, type, version) values ('Sara', 'Saric', 'sara@something.com','$2a$10$ys.u36Wk7e/9y.dkUb0svOD5I.vaFRtdDwaXQlR5K/O42EYrlWGq6','Alekse Santica 47','Novi Sad','Serbia','0635984156','032163266332',-1,-1,'ACCEPTED',TRUE,'2019-11-19 04:00:00',TRUE,1,'06:00', '14:00', FALSE,'PATIENT',0);


insert into user_authority(user_id, authority_id) value (1,1);
insert into user_authority(user_id, authority_id) value (2,2);
insert into user_authority(user_id, authority_id) value (3,4);
insert into user_authority(user_id, authority_id) value (4,5);
insert into user_authority(user_id, authority_id) value (5,3);
insert into user_authority(user_id, authority_id) value (6,4);
insert into user_authority(user_id, authority_id) value (7,4);
insert into user_authority(user_id, authority_id) value (8,4);
insert into user_authority(user_id, authority_id) value (9,4);
insert into user_authority(user_id, authority_id) value (10,4);
insert into user_authority(user_id, authority_id) value (11,2);
insert into user_authority(user_id, authority_id) value (12,3);
insert into user_authority(user_id, authority_id) value (13,3);


insert into exam_type (name, description, price,discount,removed,duration) value ('A CAT scan of the head', 'CT scanning of the head.',10000,10, FALSE,1);
insert into exam_type (name, description, price,discount,removed,duration) value ('Ultrasound of the spinal cord', 'Complete ultrasoung of spinal cord.',15000, 10, FALSE,1);
insert into exam_type (name, description, price,discount,removed,duration) value ('Physical and motor ability test', 'General ability motor and physical tests.',7000,10, FALSE,1);

insert into surgery_type(name,description,price,discount,removed,duration) value ('Appendectomy','An appendectomy is the surgical removal of the appendix. ',100000,5,FALSE,1);
insert into surgery_type(name,description,price,discount,removed,duration) value ('Laminectomy','Laminectomy is the most common surgery for lumbar spinal stenosis.',90000,5,FALSE,1);
insert into surgery_type(name,description,price,discount,removed,duration) value ('Spinal fusion','Spinal fusion is the most common surgery for chronic nonspecific back pain with degenerative changes.',150000,5,FALSE,1);

insert into doctors_exam_types(doctor_id, exam_type_id) value (3,1);
insert into doctors_exam_types(doctor_id, exam_type_id) value (3,2);
insert into doctors_exam_types(doctor_id, exam_type_id) value (3,3);

insert into doctors_exam_types(doctor_id, exam_type_id) value (6,1);
insert into doctors_exam_types(doctor_id, exam_type_id) value (6,2);

insert into doctors_exam_types(doctor_id, exam_type_id) value (7,1);
insert into doctors_exam_types(doctor_id, exam_type_id) value (7,2);
insert into doctors_exam_types(doctor_id, exam_type_id) value (7,3);

insert into doctors_exam_types(doctor_id, exam_type_id) value (8,1);
insert into doctors_exam_types(doctor_id, exam_type_id) value (8,2);
insert into doctors_exam_types(doctor_id, exam_type_id) value (8,3);

insert into doctors_surgery_types(doctor_id, surgery_type_id) value (3,1);
insert into doctors_surgery_types(doctor_id, surgery_type_id) value (3,2);
insert into doctors_surgery_types(doctor_id, surgery_type_id) value (3,3);

insert into doctors_surgery_types(doctor_id, surgery_type_id) value (6,1);
insert into doctors_surgery_types(doctor_id, surgery_type_id) value (6,2);

insert into doctors_surgery_types(doctor_id, surgery_type_id) value (7,1);
insert into doctors_surgery_types(doctor_id, surgery_type_id) value (7,2);
insert into doctors_surgery_types(doctor_id, surgery_type_id) value (7,3);

insert into doctors_surgery_types(doctor_id, surgery_type_id) value (8,1);
insert into doctors_surgery_types(doctor_id, surgery_type_id) value (8,2);
insert into doctors_surgery_types(doctor_id, surgery_type_id) value (8,3);

insert into doctors_surgery_types(doctor_id, surgery_type_id) value (9,1);
insert into doctors_surgery_types(doctor_id, surgery_type_id) value (9,2);

insert into room (name, number,room_type,removed) value ('Room 1',1,'Medical exam',FALSE);
insert into room (name, number,room_type,removed) value ('Room 2',2,'Medical exam',FALSE);
insert into room (name, number,room_type,removed) value ('Room 3',3,'Surgery',FALSE);
insert into room (name, number,room_type,removed) value ('Room 4',4,'Surgery',FALSE);


insert into medical_exam (date, start_time, end_time,statusme,doctor_id,exam_room_id,exam_type_id,patient_id,clinic_id,price,discount,version,done) values ('2020-01-31', '7:00:00','8:00:00','ACCEPTED',3,1,1,5,1,10000,10,0, true);
insert into medical_exam (date, start_time, end_time, statusme, doctor_id, exam_room_id, exam_type_id, patient_id,clinic_id,price,discount,version, done) values ('2020-02-05', '8:00:00', '9:00:00','ACCEPTED', 3, 1, 1, 5,1,10000,10,0, false);
insert into medical_exam (date, start_time, end_time,statusme, doctor_id, exam_room_id, exam_type_id, patient_id,clinic_id,price,discount,version, done) values ('2020-02-10', '9:00:00', '10:00:00','ACCEPTED', 6, 1, 1, 5,1,10000,10,0,false);
insert into medical_exam (date, start_time, end_time,statusme, doctor_id, exam_room_id, exam_type_id, patient_id,clinic_id,price,discount,version, done) values ('2020-02-11', '9:00:00', '10:00:00','ACCEPTED', 3, 1, 1, 5,1,10000,10,0,false);
insert into medical_exam (date, start_time, end_time,statusme, doctor_id, exam_room_id, exam_type_id, patient_id,clinic_id,price,discount,version, done) values ('2020-02-12', '9:00:00', '10:00:00','ACCEPTED', 3, 1, 1, 5,1,10000,10,0,false);


insert into clinic_patients (clinic_id, patient_id) values (1,5);
insert into clinic_patients (clinic_id, patient_id) values (3,5);

insert into clinic_rooms (clinic_id, rooms_id) value (1,1);
insert into clinic_rooms (clinic_id, rooms_id) value (1,2);
insert into clinic_rooms (clinic_id, rooms_id) value (1,3);
insert into clinic_rooms (clinic_id, rooms_id) value (1,4);

insert into clinics_exam_types (exam_type_id, clinic_id) value (1,1);
insert into clinics_exam_types (exam_type_id, clinic_id) value (2,1);
insert into clinics_exam_types (exam_type_id, clinic_id) value (3,1);
insert into clinics_exam_types (exam_type_id, clinic_id) value (1,3);
insert into clinics_exam_types (exam_type_id, clinic_id) value (2,3);


insert into clinics_surgery_types(surgery_type_id, clinic_id) value (1,1);
insert into clinics_surgery_types(surgery_type_id, clinic_id) value (2,1);
insert into clinics_surgery_types(surgery_type_id, clinic_id) value (3,1);


insert into medical_report (description,date,time,doctor_id) value ('Chronic migraines. Chronic daily headaches.','2019-03-07','12:00:00',3);
insert into medical_report (description,date,time,doctor_id) value ('Gastric acid.','2019-04-07','13:00:00',6);

insert into medication (code, description) value ('#ABC12300','Bensedin 500 mg');
insert into medication (code, description) value ('#AF000025','Nolpaza 40 mg');
insert into medication (code, description) value ('#AB250020','Vitamin D 2000 UI');
insert into medication (code, description) value ('#BD803021','Ciprocinal 500 mg');

insert into prescription (verified, medication_id, nurse_id, patient_id, doctor_id, clinic_id, version) value (TRUE,1,4,5,6,2,1);
insert into prescription (verified, medication_id, nurse_id, patient_id, doctor_id, clinic_id, version) value (FALSE,2,null,5,3,1,0);
insert into prescription (verified, medication_id, nurse_id, patient_id, doctor_id, clinic_id, version) value (FALSE,3,null,5,3,1,0);

insert into medical_record_medical_reports (medical_record_id, medical_reports_id) value (1,1);
insert into medical_record_medical_reports (medical_record_id, medical_reports_id) value (1,2);

insert into medical_report_prescriptions (medical_report_id, prescriptions_id) value(1,1);
insert into medical_report_prescriptions (medical_report_id, prescriptions_id) value(2,2);
insert into medical_report_prescriptions (medical_report_id, prescriptions_id) value(2,3);

insert into medical_report_diagnoses (medical_report_id, diagnoses_id) value (1,1);
insert into medical_report_diagnoses (medical_report_id, diagnoses_id) value (2,1);
insert into medical_report_diagnoses (medical_report_id, diagnoses_id) value (2,2);


insert into surgery (date,start_time, end_time ,patient_id,surgery_type_id,clinic_id,price,discount,surgery_room_id,version,statusS) value ('2020-02-10','07:00:00','08:00:00',5,1,1,100000,5,3,0,'APPROVED');
insert into surgery (date,start_time,end_time,patient_id,surgery_type_id,clinic_id,price,discount,surgery_room_id,version,statusS) value ('2020-02-11','07:00:00','08:00:00',5,1,1,100000,5,3,0,'APPROVED');
insert into surgery (date,start_time,end_time,patient_id,surgery_type_id,clinic_id,price,discount,surgery_room_id,version,statusS) value ('2020-02-12','07:00:00','08:00:00',5,1,1,100000,5,3,0,'APPROVED');

insert into doctors_surgeries (doctor_id, surgery_id) value (3,1);
insert into doctors_surgeries (doctor_id, surgery_id) value (6,1);

insert into medical_record_allergic_medication(medical_record_id,medication_id) values (1,3);
insert into medical_record_allergic_medication(medical_record_id,medication_id) values (1,4);

insert into medical_record_chronic_condition(medical_record_id, diagnose_id) values (1,3);
insert into medical_record_chronic_condition(medical_record_id, diagnose_id) values (1,4);



/*
-- Selenium testing - for e2e tests create database with this data included
insert into medical_exam (date, start_time, end_time,statusme,doctor_id,exam_room_id,exam_type_id,patient_id,clinic_id,price,discount,version,done) values ('2020-02-10', '7:00:00','8:00:00','REQUESTED',3,NULL,1,5,1,10000,10,0, false);
insert into medical_exam (date, start_time, end_time, statusme, doctor_id, exam_room_id, exam_type_id, patient_id,clinic_id,price,discount,version, done) values ('2020-02-10', '7:00:00', '8:00:00','REQUESTED', 3, NULL, 1, 5,1,10000,10,0, false);
insert into medical_exam (date, start_time, end_time,statusme, doctor_id, exam_room_id, exam_type_id, patient_id,clinic_id,price,discount,version, done) values ('2020-02-10', '11:00:00', '12:00:00','REQUESTED', 7, NULL, 1, 5,1,10000,10,0,false);


insert into fast_appointment(datefa, discount,done,duration,price,reserved,timefa,clinic_id,doctor_id,exam_type_id,patient_id,room_id,version) values ('2020-02-10',10, FALSE,1,5000, FALSE,'08:00:00' ,1, 3, 1, NULL, 1,0);
insert into fast_appointment(datefa, discount,done,duration,price,reserved,timefa,clinic_id,doctor_id,exam_type_id,patient_id,room_id,version) values ('2020-02-10',10, FALSE,1,5000, FALSE, '10:00:00', 1, 3, 1, NULL, 1,0);


-- Free terms for rooms in the clinic for the specific date and time
insert into term_room(date_term, end_time, free,start_time,room_id) values ('2020-02-10', '7:00:00',false,'6:00:00',1);
insert into term_room(date_term, end_time, free,start_time,room_id) values ('2020-02-10', '8:00:00',true,'7:00:00',1);
insert into term_room(date_term, end_time, free,start_time,room_id) values ('2020-02-10', '9:00:00',false,'8:00:00',1);
insert into term_room(date_term, end_time, free,start_time,room_id) values ('2020-02-10', '10:00:00',true,'9:00:00',1);
insert into term_room(date_term, end_time, free,start_time,room_id) values ('2020-02-10', '11:00:00',true,'10:00:00',1);
insert into term_room(date_term, end_time, free,start_time,room_id) values ('2020-02-10', '12:00:00',true,'11:00:00',1);

-- free terms for doctors for the specific date and time
insert into term_doctor(date_term, end_time, free,start_time,doctor_id) values ('2020-02-10', '8:00:00',false,'7:00:00',3);
insert into term_doctor(date_term, end_time, free,start_time,doctor_id) values ('2020-02-10', '9:00:00',true,'8:00:00',3);
insert into term_doctor(date_term, end_time, free,start_time,doctor_id) values ('2020-02-10', '10:00:00',false,'9:00:00',3);
insert into term_doctor(date_term, end_time, free,start_time,doctor_id) values ('2020-02-10', '11:00:00',true,'10:00:00',3);
insert into term_doctor(date_term, end_time, free,start_time,doctor_id) values ('2020-02-10', '12:00:00',true,'11:00:00',3);
insert into term_doctor(date_term, end_time, free,start_time,doctor_id) values ('2020-02-10', '13:00:00',true,'12:00:00',3);
*/
