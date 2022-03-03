const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 12
const MIN_PASSWORD_LENGTH = 6
const MAX_PASSWORD_LENGTH = 25

module.exports = function({}){
	return {
		getErrorsNewAccount: function(account){
	
			const errors = []
			
			// Validate username.
			if(!account.hasOwnProperty("username")){
				errors.push("username is missing")
			}else if(account.username.length < MIN_USERNAME_LENGTH){
				errors.push("username is too short")
			}else if(MAX_USERNAME_LENGTH < account.username.length){
				errors.push("username is too long")
			}
			if(!account.hasOwnProperty("password")){
				errors.push("password is missing")
			} else if(account.password.length < MIN_PASSWORD_LENGTH){
				errors.push("password is too short")
			} else if(account.password.length > MAX_PASSWORD_LENGTH){
				errors.push("password is too long")
			}
			
			return errors
			
		}
	}
}