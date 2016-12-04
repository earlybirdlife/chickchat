import moment from "moment"
import React, {PropTypes} from "react"
import {connect} from "react-redux"
import ReplyBox from "./ReplyBox"


export class Chat extends React.Component {
    render () {
        return (
            <div style={rootStyle}>
                <ul style={ulStyle} ref="messages">
                    {this.props.messages.map(renderMessage)}
                </ul>
                {/* Exercise 2: Add a ReplyBox component */}
                  <ReplyBox />
            </div>
        )
    }

    componentDidUpdate (prevProps) {
        if (prevProps.messages.length === this.props.messages.length) {
            return
        }

        const element = this.refs.messages
        if (element) {
            element.scrollTop = element.scrollHeight
        }
    }
}

function renderMessage (message) {
    return (
        <li style ={{wordBreak: "break-all"}} key={message.messageId}>

            {/* Exercise 3: Add message author */}
            <img style={imageStyle} src = {message.author.picture}  height = "50" />
            <span style= {{fontFamily: "Arial", fontSize: "15",fontWeight: "bold", color: "#EF6F79"}}>
            {"[" + message.author.name + "] "}
            </span>
            {getMessageBody(message)}
        </li>
    )
}


const fontStyle = {
  fontFamily: "Courier",
  fontColor: "Blue",
  fontSize: "20px"
}

const ulStyle = {
    overflowY: "scroll",
    listStyle: "none"
    /* Exercise 4: Add your own styles */

}

const imageStyle = {
    maxWidth: "80px",
    maxHeight: "80px",
    borderRadius: "80px",
    objectFit: "contain"

}

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "100%"
}

function getMessageDate (message) {
    return moment(message.timestampUtc).format("dddd, h:mm A")
}

function getMessageBody (message) {
    if (message.data) {
        return <img src={message.data} style={imageStyle} />
    } else {

        return (
          <span style={{color:"black", fontFamily: "Arial"}}>
          {message.text}
          </span>
    )
  }
}

Chat.propTypes = {
    messages: PropTypes.array
}

function mapStateToProps (state) {
    return {
        messages: state.messages
    }
}

export default connect(
    mapStateToProps
)(Chat)
