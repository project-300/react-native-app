## SignUp Screen

#### State Mapping
| State | Source |
|-----|-----|
| email | Email field input |
| username | Username field input |
| password | Password field input |
| error | Manual validation checks or AWS Incognito validation checks |

#### Submission
Upon clicking the "Sign Up" button, a call is made to AWS Amlify. The email, username and password is sent via the Amlify SDK.

#### Failure
If the user is missing either their email, username or password, they will be alerted before making the call to AWS.

If the details entered do not meet any of the requirements on Cognito's side, the appropriate error message that was returned and is shown to the user. 

#### Success 
If the validation is successful, an account is created with AWS Cognito. This account is unconfirmed. The user will receive an email with a 6-digit code.

The app will bring them to a new screen (`/src/screens/signup/confirmation`) where they must enter the 6 digits to confirm their account.

The app will then redirect to the login screen.
