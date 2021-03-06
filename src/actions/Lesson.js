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
export const fetchGetDiscussions = (params) => ({
	[CALL_API]: {
		url : params.url,
		type: "GET_DISCUSSIONS",
		params
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
		url : params.url,
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

export const fetchGetEnrollmentsInLesson = (params) => ({
  [CALL_API]: {
	endpoint : "/lessons/$id/authorities",
    type: "GET_ENROLLMENTS_LESSONS",
    params 
  }
})
export const saveLesson = (params) => ({
	type: "SAVE_LESSON",
	params,
	value : {
	    name: params.name,
	    content: params.content
    }
})
export const fetchSaveLesson = (params) => ({
  [CALL_API]: {
	url : params.url,
    type: "SAVE_LESSON_FETCH",
    params,
    body: {
	    name: params.name,
	    content: params.content
    }
  }
})