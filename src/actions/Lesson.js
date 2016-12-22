import {fetchData} from "./index.js"
import {CALL_API} from "../middleware/api"

export const fetchGetLesson = (id) => ({
  [CALL_API]: {
	 endpoint : "/lessons/$id",
    type: "GET_LESSON",
    params : {
	    id
    }
  }
})
export const fetchGetDiscussions = (id) => ({
	[CALL_API]: {
		endpoint : "/lessons/$id/discussions",
		type: "GET_DISCUSSIONS",
		params : {
			id
		}
	}
})
export const fetchAddDiscusssion = (params) => ({
	  [CALL_API]: {
		 endpoint : "/discussions",
	    type: "ADD_DISCUSSION",
	    params,
	    body: {
		    lesson: params.lesson,
		    comment: params.comment,
	    }
	  }
})
export const fetchGetDiscussionReplies = (params) => ({
	[CALL_API]: {
		endpoint : "/discussions/$discussionId/replies",
		type: "GET_DISCUSSION_REPLIES",
		params
	}
})
export const fetchAddDiscusssionReply = (params) => ({
  [CALL_API]: {
	endpoint : "/discussionReplies",
    type: "ADD_DISCUSSION_REPLY",
    params,
    body: {
	    discussion: params.discussion,
	    comment: params.comment,
    }
  }
})