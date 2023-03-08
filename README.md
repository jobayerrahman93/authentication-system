Registration flow:-
- User will give their phone number, email address, password and full name to register.
- If an user already exist with that phone number and that phone number is already verified by other user, then new user cannot register
with that phone number.
- Similar to phone number, If an user already exist with that email address and that email address is already verified by other user, then
new user cannot register with that email address.
- User can only register if and only if both phone number and email are not taken and verified by other user.
- If phone number and email address is acceptable, then user must have to verify their phone number and email address.
- If user didn’t verify their phone number / email address after providing registration data, then other user can use that unverified phone
number / email address to register.

Login flow:-
- User can only login with phone number and password.
- If user’s phone number and password is correct, but didn’t verify their phone number, then user cannot login.
- But, if user’s phone number and password is correct, but didn’t verify their email address, then user can still login if and only if phone
number is verified.

Process to verify phone number / email address:-
- User can verify their phone number via OTP code which has an expiry of 5 minutes.
- User can verify their email address via a verification url which contains a JWT token and the expiry of the token will be 24 hours.

Password validation:-
- At least 12 characters long.
- A combination of uppercase letters, lowercase letters, numbers, and symbols.

Forgot / reset password flow:-
- User can reset their password with phone number verification only via temporary OTP code.
- User cannot reset their password via email address.

Change password after successful login:-
- Take user’s existing password and new password to change their password.
- Validate first if existing password is correct or not, then change the password to new one.

Change password from forgot password:-
- Take only new password to change user’s password.
- Validate if the request is comes from the correct user or not, otherwise show malicious request.
