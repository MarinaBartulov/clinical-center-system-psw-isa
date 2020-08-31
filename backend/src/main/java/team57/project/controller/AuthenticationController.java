package team57.project.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import team57.project.dto.UserRequest;
import team57.project.dto.UserTokenState;
import team57.project.model.User;
import team57.project.model.VerificationToken;
import team57.project.security.TokenUtils;
import team57.project.security.auth.JwtAuthenticationRequest;
import team57.project.service.impl.EmailServiceImpl;
import team57.project.service.UserService;
import team57.project.service.impl.CustomUserDetailsService;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Calendar;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@Controller
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

    @Autowired
    TokenUtils tokenUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    private Logger logger = LoggerFactory.getLogger(AuthenticationController.class);
    @Autowired
    private EmailServiceImpl emailService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest,
                                                       HttpServletResponse response) throws AuthenticationException, IOException {

        final Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
                        authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();
        String jwt = tokenUtils.generateToken(user.getEmail());
        int expiresIn = tokenUtils.getExpiredIn();

        return ResponseEntity.ok(new UserTokenState(jwt, expiresIn)); //this dto object contains the token which is sent to the client
    }

    @RequestMapping(method = POST, value = "/signup")
    public ResponseEntity<?> addUser(@RequestBody UserRequest userRequest, UriComponentsBuilder ucBuilder) {

        User existUser = this.userService.findByEmail(userRequest.getEmail());
        if (existUser != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This email already exists in the system.");
        }

        User user = this.userService.save(userRequest);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/confirmRegistration/{token}", method = RequestMethod.GET)
    public ResponseEntity<?> confirmRegistration(@PathVariable("token") String token) {
        VerificationToken verificationToken = userService.getVerificationToken(token);
        if (verificationToken == null) {
            String message = "Verification token doesn't exist.";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }
        User user = verificationToken.getUser();
        Calendar cal = Calendar.getInstance();
        if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            String messageValue ="Token expired.";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(messageValue);
        }
        user.setEnabled(true);
        userService.enableRegisteredUser(user);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @RequestMapping(value = "/changePassword", method = RequestMethod.PUT)
    @PreAuthorize("hasRole('ROLE_PATIENT') or hasRole('ROLE_DOCTOR') or hasRole('ROLE_CLINIC_ADMIN') or hasRole('ROLE_CLINICAL_CENTER_ADMIN') or hasRole('ROLE_NURSE')")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChanger passwordChanger) {
        userDetailsService.changePassword(passwordChanger.oldPassword, passwordChanger.newPassword);
        return new ResponseEntity(HttpStatus.OK);
    }

    static class PasswordChanger {
        public String oldPassword;
        public String newPassword;
    }


}
