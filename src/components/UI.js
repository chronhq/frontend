import React from 'react';

import 'font-awesome/less/font-awesome.less';
import './UI.less'	


class UI extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = 
        {
            isOpen: false,
            style:{float:'right'},
        };
    }
  
    toggle(e) {
        e.preventDefault();
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
				<div><div className="icon-bar">
            <a onClick={this.toggle} href="#"><i className="fa fa-home"></i></a> 
            <a onClick={this.toggle} href="#"><i className="fa fa-search"></i></a> 
            <a href="#"><i className="fa fa-clock-o"></i></a> 
            <a href="#"><i className="fa fa-globe"></i></a>
            <a href="#"><i className="fa fa-bar-chart"></i></a> 
            <a href="#"><i className="fa fa-cog"></i></a> 
            <a href="#"><i className="fa fa-cog"></i></a> 
        </div>
        { this.state.isOpen ? <SideBar /> : null }
				</div>
        );}
}


class SideBar extends React.Component {
    render() {
        return(
        <div className="sidenav">
          Red
          <div className="panel panel-default">
          <div className="panel-body"> <a> Event 1</a> </div>
          </div>
          </div>
        );}
 }


export default UI;