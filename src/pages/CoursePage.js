import React, { Component } from 'react'
import * as NEXTActions from '../actions/Course'
import { bindActionCreators } from 'redux'
import classNames from 'classnames'
import { connect } from 'react-redux'
import LectureCard from '../components/CoursePage/LectureCard'
import AddLectureCard from '../components/CoursePage/LectureCard.add'
//import LecturePage from './LecturePage'
import Participants from '../components/CoursePage/Participants'
import './css/CoursePage.css'
import { Link } from 'react-router'
import LoginSession from "../class/LoginSession"
import StoreSession from "../class/StoreSession"

class component extends Component {
	courseId = "";
	sessionId = "";
	position = [];
	componentWillMount() {
		document.body.className = "view-course";
		const {actions, params} = this.props;
		const {course, session} = params;
		this.courseId = course;
		this.sessionId = session;
		//by Course Id
		if(typeof course !== "undefined")
			actions.fetchGetCourse(course);
			
			
		StoreSession.setStore("coursepage", this)
	}
	componentWillUnmount() {
		StoreSession.unsetStore("coursepage")
	}
	componentWillUpdate() {
		const course = this.props.state.course;
		const {lectures, pos} = course;
		this.orderLectures(lectures, pos);
	}
	showMenu = () => {
		this.refs.participants.getWrappedInstance().show();
	}
	applyCourse = (e) => {
		if(!confirm("강의를 신청하시겠습니까?"))
			return;
			
			
		const {actions, state} = this.props;
		actions.fetchAddMyCourse(state.course.id).then(result=> {
			alert("신청되었습니다.")
		}).reject(result=> {
			alert("신청하지 못했습니다.")
		})
	}

	renderHeader(memberStatus) {
		const course = this.props.state.course
		const {name, instructors, status} = course;
			
		let statusName;
		
		switch(status) {
			case 1:
				statusName = "수강중";
				break;
			case 2:
				statusName = "강의 끝";
				break;
			default:
				statusName = "강의 예정";
				break;
		}
		
		
		memberStatus = "NOT_LOGIN";
  		if(LoginSession.isLogin()) {
	  		const instructor = course.instructors.filter(instructor => (LoginSession.loginInfo.id === instructor.id))
	  		const participant = course.participants.filter(participant=>(LoginSession.loginInfo.id === participant.id))
	  		if(instructor.length !== 0) 
	  			memberStatus = "INSTRUCTOR"
	  		else if(participant.length === 0)
	  			memberStatus = "REQUIRE_APPLY"
	  		else if(participant[0].status === "request")
	  			memberStatus = "REQUEST_APPLY"
	  		else
	  			memberStatus = "APPROVED"
	  	}
	  	
	  	
		let applyLabel = ""
		switch(memberStatus) {
			case "INSTRUCTOR":
				applyLabel = (<a className="course-header-apply label" href="#">관리자</a>)	
				break;			
			case "APPROVED":
				applyLabel = (<a className="course-header-apply label" href="#">승인 ㅇㅇ</a>)	
				break;
			case "REQUEST_APPLY":
				applyLabel = (<a className="course-header-apply label" href="#">신청중</a>)	
			case "NOT_LOGIN":
			case "REQUIRE_APPLY":
			default:
				applyLabel = (<a className="course-header-apply label" href="#" onClick={this.applyCourse}>신청하기</a>)			
				break;
		}
	

		return (
			<div className="course-header">
				<span className="course-header-name">{name}</span>
				{instructors.map((instructor,i) => (
				<span className="course-header-professor" key={i}><Link to={"/professor/"+instructor.id} >{instructor.name}</Link></span>				
				))}
				<span className={classNames({
					label:true,
					"label-danger": status === 2,
					"label-success": status === 1,
					"label-warning": status === 0,
					
				})}>{statusName}</span>
				
				<a className="course-header-btn-show-menu" href="#" onClick={this.showMenu}>
					<span className="glyphicon glyphicon-option-horizontal"></span>
					<span className="course-header-btn-text">Show Menu</span>
				</a>
				
				<a className="course-header-info ">i</a>
				{applyLabel}
			</div>
			
		)
	}
	renderParticipants() {
		const course = this.props.state.course;
		if(course.id > 0)
			return (<Participants course={course} ref="participants"/>)
			
		return ""
	}
	orderLectures = (lectures, pos, is_master) => {
		const course = this.props.state.course;
  		const objLectures = {};
  		
  		let addPos = lectures.filter(lecture => {
	  		objLectures[lecture.id] = lecture;
	  		
	  		return pos.every((id, index) => {
		  		
		  		//lecture가 pos Array에  하나라도 없을 때 true를 return한다.
		  		
				if(id instanceof Array)
					return id.indexOf(lecture.id) === -1
				
				return id !== lecture.id
	  		})
  		}).map(lecture=>(lecture.id))



  		let is_update = false;

  		
  		if(addPos.length > 0) {
	  		console.log(addPos);
	  		pos = pos.concat(addPos);
	  		is_update = true;

  		}
  		
  		addPos = pos;
  		pos = pos.filter(id => (id in objLectures))

  		if(pos.length != addPos.length) {
	  		is_update = true;
  		}
  		
  		if(!is_master && is_update) {
	  		this.props.dispatch(
		  		{
			  		type:"SAVE_LECTURE_POSITION",
			  		lecture_position : pos
		  		}
	  		)
  		}
  		
  		
  		if(!is_master) {
	  		this.position = pos;
  		} 
  		
  		return pos;
	}
	renderLectures(lectures, pos=[],  memberStatus, is_master ) {
  		const course = this.props.state.course;
		const objLectures = {};
		const draggable = !is_master && memberStatus === "INSTRUCTOR"
	  	lectures.filter(lecture => {
	  		objLectures[lecture.id] = lecture;
		});	
		
		if(is_master) {
			pos = this.orderLectures(lectures, pos, is_master);
		}
  		return (<div className="lecture-cards">{pos.map((id,i) => {
	  			const lecture = objLectures[id]
	  			console.log(lecture, id);
				return (<LectureCard key={lecture.id} position={i} lecture={lecture} course={course} status={memberStatus} draggable={draggable}/>)
			})}</div>)
  		

	}
	renderMaster(memberStatus) {

		if(this.sessionId === "master")
			return;

		const master = this.props.state.course.master;

		
		if(!master)			
			return;

			
		return (
			<div className="course-master-lectures">
				{this.renderLectures(master.lectures, master.pos, memberStatus, true)}
			</div>
		)
	}
	render() {
		if(!("course" in this.props.state))
			return "";
			
		const course = this.props.state.course;
  		const {lectures} = course;
  		
  		
  		let memberStatus = "NOT_LOGIN";
  		if(LoginSession.isLogin()) {
	  		const instructor = course.instructors.filter(instructor => (LoginSession.loginInfo.id === instructor.id))
	  		const participant = course.participants.filter(participant=>(LoginSession.loginInfo.id === participant.id))
	  		if(instructor.length !== 0) 
	  			memberStatus = "INSTRUCTOR"
	  		else if(participant.length === 0)
	  			memberStatus = "REQUIRE_APPLY"
	  		else if(participant[0].status === "request")
	  			memberStatus = "REQUEST_APPLY"
	  		else
	  			memberStatus = "APPROVED"
	  	}
  		
  		const addLectureCard = memberStatus === "INSTRUCTOR" ?(<AddLectureCard actions={this.props.actions} course={course}/>) : ""
  		
  		return (
  		<div className="course-lectrues-wrapper">

  		{this.renderParticipants()}
		{this.renderHeader(memberStatus)}
		<div className="course-lectures">
			<div className="course-session-lectures">
				{this.renderLectures(lectures, course.pos, memberStatus)}
			</div>
			{this.renderMaster(memberStatus)}
			{addLectureCard}	
		</div>
  		<div className="lecture-participant-list"></div>
  		<div className="lecture-overlay"></div>
  		</div>
  		)
  	}
}


const mapStateToProps = state => ({state: state.CoursePage})

const mapDispatchToProps = dispatch => {
  return{  actions: bindActionCreators(NEXTActions, dispatch), dispatch}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)


 