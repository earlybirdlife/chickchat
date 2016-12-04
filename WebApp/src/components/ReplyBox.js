import React, {PropTypes} from "react"
import {connect} from "react-redux"
import {fontStyle} from "./Chat"
import attachImage from "src/util/attachImage"

export class ReplyBox extends React.Component {
  onAttachImage = attachImage.bind(this)

    state = {
        text: ""
    }

    updateText = (e) => {
        this.setState({text: e.target.value})
    }

    sendReply = () => {
        this.props.replyText(this.state.text)
        this.setState({text: ""})
    }

    sendImage = () => {
      this.props.replyImage(this.state.data)
      this.setState({data: ""})
    }

    render () {
        return (
            <div>

                {/* Exercise 2: Render a text input and a button */}
                <input value = {this.state.text} onChange = {this.updateText}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    this.sendReply()
                  }
                }}/>
                <button style = {{backgroundColor: "PaleVioletRed", boarder: "none", textDecoration: "none", border: "none", display: "inline-block", margin: "4px 2px", fontFamily: "Arial", fontSize: "15",fontWeight: "bold", color: "White"}} onClick={this.sendReply} disabled={this.state.text === ""}>Send ❤</button>

                <input type="file" onChange={this.onAttachImage} style = {{backgroundColor: "#6767FF", boarder: "none", textDecoration: "none", border: "none", display: "inline-block", margin: "4px 2px", fontFamily: "Arial", fontSize: "15",fontWeight: "bold", color: "White"}} />

                <button onClick={this.sendImage}>Upload image</button>
            </div>
        )
    }
}

ReplyBox.propTypes = {
    replyImage: PropTypes.func,
    replyText: PropTypes.func
}

export default connect(undefined, {
    replyText: (text) => ({
        type: "REPLY",
        apiEndpoint: "chatPOST",
        payload: {text}
    }),
    replyImage: (data) => ({
        type: "REPLY",
        apiEndpoint: "chatPOST",
        payload: {data}
    })
})(ReplyBox)
