const MIN_REVIEW_LENGTH = 3
const MAX_REVIEW_LENGTH = 255

module.exports = function({}){
	return {
		getErrorsNewReview: function(review){
			const errors = []
			// Validate username.
			if(!review){
				errors.push("review content is missing")
			}else if(review.length < MIN_REVIEW_LENGTH){
				errors.push("review is too short")
			}else if(MAX_REVIEW_LENGTH < review.length){
				errors.push("review is too long")
			}
			return errors
		}
	}
}