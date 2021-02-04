import { Modal } from "react-bootstrap";
import React, { Component } from "react";
import "./Board.css";

export class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerTurn: "X",
      boardArray: ["", "", "", "", "", "", "", "", ""],
      result: "",
      isFinished: false,
      stepCounter: 1,
      isOpen: true,
    };
  }

  handleClick = (index) => {
    if (
      this.state.result === "" &&
      this.state.stepCounter <= 9 &&
      this.state.boardArray[index] === ""
    ) {
      console.log("inside if");
      this.setState({
        stepCounter: this.state.stepCounter + 1,
      });
      let PLAYER_TURN = this.state.playerTurn;
      let BOARD_ARRAY = this.state.boardArray;
      console.log(PLAYER_TURN);
      console.log(BOARD_ARRAY[index]);
      console.log(index);
      BOARD_ARRAY[index] = PLAYER_TURN;
      let winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < winningCombos.length; i++) {
        let winningRow = winningCombos[i];
        //   console.log("winning row ", winningRow);

        let p1 = winningRow[0];
        let p2 = winningRow[1];
        let p3 = winningRow[2];
        //   console.log("p1", p1);

        //   console.log("BOARD_ARRAY[p1] ", BOARD_ARRAY[p1]);
        //   console.log("BOARD_ARRAY[p2] ", BOARD_ARRAY[p2]);
        //   console.log("BOARD_ARRAY[p3] ", BOARD_ARRAY[p3]);

        if (
          BOARD_ARRAY[p1] !== "" &&
          BOARD_ARRAY[p2] !== "" &&
          BOARD_ARRAY[p3] !== "" &&
          BOARD_ARRAY[p1] === BOARD_ARRAY[p2] &&
          BOARD_ARRAY[p2] === BOARD_ARRAY[p3] &&
          BOARD_ARRAY[p3] === BOARD_ARRAY[p1]
        ) {
          // if (PLAYER_TURN === "X") {
          //   this.setState({
          //     result: "Player 1 Wins !!!",
          //     isFinished: true,
          //   });
          // }
          // if (PLAYER_TURN === "O") {
          //   this.setState({
          //     result: "Player 2 Wins !!!",
          //     isFinished: false,
          //   });
          // }
          // console.log(`Winner is ${PLAYER_TURN}`);
          this.setState({
            result: `Winner is ${PLAYER_TURN}`,
            isFinished: true,
          });
          break;
        }
      }
      // console.warn(BOARD_ARRAY);

      PLAYER_TURN = PLAYER_TURN === "X" ? "O" : "X";

      this.setState({
        playerTurn: PLAYER_TURN,
        boardArray: BOARD_ARRAY,
      });
    }
    if (this.state.stepCounter == 9 && this.state.result == "") {
      this.setState({
        isFinished: true,
        result: "Oops , Out of moves !!!",
      });
    }
  };

  handleCloseModal = () => {
    this.setState({
      isFinished: false,
    });
    window.location.reload();
  };

  render() {
    return (
      <div className="board">
        <p className="heading">Tic Tac Toe</p>
        {this.state.boardArray.map((data, index) => {
          return (
            <button
              key={index}
              onClick={() => this.handleClick(index)}
              className="btn btn-danger"
              style={{
                // border: "1px solid lightgray",
                // border: "1px solid black",
                border: "white 1px solid",
                width: "33.3%",
                height: "10vh",
                fontSize: "50px",
              }}
            >
              {data}
            </button>
          );
        })}
        <Modal
          style={{
            marginTop: "23vh",
          }}
          show={this.state.isFinished}
        >
          <Modal.Header style={{ justifyContent: "center" }}>
            <p style={{ fontFamily: "Anton, sans-serif", fontSize: "50px" }}>
              Result
            </p>
          </Modal.Header>
          <Modal.Body
            style={
              this.state.result === "Oops , Out of moves !!!"
                ? {
                    textAlign: "center",
                    fontSize: "30px",
                  }
                : {
                    textAlign: "center",
                    fontSize: "30px",
                    backgroundImage: `url("https://media1.giphy.com/media/USOWFXIk9fyTllM0aV/source.gif")`,
                    backgroundSize: "contain",
                  }
            }
          >
            <br />
            <br />
            <p style={{ fontFamily: "Anton, sans-serif" }}>
              {this.state.result}
            </p>
            <br />
            <br />
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.handleCloseModal} className="btn btn-primary">
              Restart
            </button>
          </Modal.Footer>
        </Modal>
        <Modal
          style={{
            marginTop: "23vh",
          }}
          show={this.state.isOpen}
        >
          <Modal.Header
            style={{
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontFamily: "Anton, sans-serif",
                fontSize: "50px",
              }}
            >
              Tic Tac Toe
            </p>
          </Modal.Header>
          <Modal.Body
            style={{
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            <br />
            <p
              style={{
                padding: "10px",
              }}
            >
              <strong>Player 1 : X</strong>
            </p>
            <p
              style={{
                padding: "10px",
              }}
            >
              <strong>Player 2 : O</strong>
            </p>
            <br />
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={() =>
                this.setState({
                  isOpen: false,
                })
              }
              className="btn btn-success"
              style={{
                width: "40%",
                margin: "auto",
              }}
            >
              Start Game
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Board;
