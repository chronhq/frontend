import React from 'react';

import 'font-awesome/less/font-awesome.less';
import './UI.less'

import ControlButtonsController from '../containers/ControlButtonsController';	


class UI extends React.Component {
    constructor(props) {
        super(props);
        this.state = 
        {
            isOpen: false,
            current: 0,
            style:{float:'right'},
        };
    }
  

    toggle = (id) => {
    	const isOpen = !(this.state.current === id && this.state.isOpen === true); 
    	this.setState({...this.state, isOpen, current:id});
    }

    render() {
    		
        return (

				<div><div className="icon-bar">
            <a id="Sidebar1" onClick={() => this.toggle('1')} href="#"><i className="fa fa-home"></i></a> 
            <a onClick={() => this.toggle('2')} href="#"><i className="fa fa-search"></i></a> 
            <a onClick={() => this.toggle('3')} href="#"><i className="fa fa-clock-o"></i></a> 
            <a onClick={() => this.toggle('3')} href="#"><i className="fa fa-globe"></i></a>
            <a onClick={() => this.toggle('3')} href="#"><i className="fa fa-bar-chart"></i></a> 
            <a href="#"><i className="fa fa-cog"></i></a> 
            <a href="#"><i className="fa fa-cog"></i></a> 
        </div>
        
        	{this.state.isOpen ?
        	<div>
         {this.state.current == 1 ? <SideBar /> : null }
         {this.state.current == 2 ? <SideBar2 /> : null }
         {this.state.current == 3 ? <SideBar3 /> : null }
         </div> : null
       }
      
				</div>
        );}
}


class SideBar extends React.Component {
    render() {
        return(
        <div className="sidenav">
          ControlButtonsController
          <ControlButtonsController />
        </div>
        );}
 }

class SideBar2 extends React.Component {
    render() {
        return(
        <div className="sidenav">
          SideBar 2
        </div>
        );}
}

class SideBar3 extends React.Component {
    render() {
        return(
        <div className="sidenav">
          SideBar 3
        </div>
        );}
 }


export default UI;