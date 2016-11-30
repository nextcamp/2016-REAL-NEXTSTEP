import * as types from '../constants/ActionTypes'

let links = {
	"DOMAIN" : 	"http://srello.xyz/api"
}


links[types.GET_MY_LECTURES] = "/mylectures.json";


links[types.GET_PROFESSOR] = "/professor.json";




links["GET_COURSES_MORE"] = "/courses/search?instructor=$id&state=closed"
links["GET_COURSES"] = "/courses";
links["GET_COURSE"] = "/courses/$id";

links["GET_LECTURE"] = "/lectures/$id";

links["GET_LESSON"] = "/lessons/$id"
links["GET_DISCUSSIONS"] = "/lessons/$id/discussions"
links["GET_DISCUSSION"] = "/discusssions/$id"

links["GET_DISCUSSION"] = "/discussions/$id"
links["GET_PARTICIPANTS"] = "/lectures/$id/participants"



links["GET_MY_COURSES"] = "/me/courses/participate"




links["ADD_LESSON"] = "/lectures/$id/lessons";
links["ADD_LECTURE"] = "/courses/$id";
links["ADD_MY_COURSE"] = "/me/courses/participate";
links["ADD_DISCUSSION"] = "/lessons/$id/discussions"
links["ADD_DISCUSSION_REPLY"] = "/discussions/$id/reply"


links["GET_LOGIN_INFO"] = "/../user"
links["REQUEST_LOGIN"] = "/../login"
links["REQUEST_LOGOUT"] = "/me/logout"

const methodType = {
	"get" : "GET",
	"add" : "POST",
	"request" : "POST",
}

export {links, methodType};

