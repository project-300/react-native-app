## Login Screen

#### State Mapping
| State | Source |
|-----|-----|
| username | Username field input |
| password | Password field input |
| error | Manual validation checks or AWS Incognito validation checks |

#### Submission
Upon clicking the submit button, a call is made to AWS Amlify. The username and password is sent via the Amlify SDK to be validated.

The account details are validated with AWS Cognito.

#### Failure
If the user is missing either their username or password, they will be alerted before making the call to AWS.

If the validation is unsuccessful, the appropriate error message that was returned from AWS Cognito is shown to the user. 

#### Success 
If the validation is successful, the details returned from the API call is then sent to AWS Lambda to be logged in our database. 
The app then navigates to the home screen.
