import { Checkbox, Label, Segment } from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';
import { CommonStore } from '../../stores/common.store'
import { useState } from 'react';

function NewGame({ store }: { store: CommonStore }) {
    const [wordCount, setWordCount] = useState(30)
    const [roundTime, setRoundTime] = useState(60)
    const [skipPenalty, setSkipPenalty] = useState(true)
    return (
        <div className="NewGame">
            <Segment>
                <Label ribbon size="large" color="blue">
                    Words to win: {wordCount}
                </Label>
                <Slider
                    discrete
                    value={wordCount}
                    style={{
                        // marginTop: "1em",
                        height: "4em",
                        track: { top: "2em" },
                        trackFill: { top: "2em", backgroundColor: "#3498db" },
                        thumb: {
                        //   backgroundColor: "purple",
                        top: "1em",
                        width: "2em",
                        height: "2em"
                        }
                    }}

                    settings={{
                        min: 10,
                        max: 200,
                        step: 1,
                        onChange: (value: number) => {
                            console.log(value)
                            setWordCount(value)
                        }
                    }}
                />
                <br />
                <Label ribbon size="large" color="blue">
                    Round time: {roundTime}
                </Label>
                <Slider
                    discrete
                    value={roundTime}
                    style={{
                        // marginTop: "1em",
                        height: "4em",
                        track: { top: "2em" },
                        trackFill: { top: "2em", backgroundColor: "#3498db" },
                        thumb: {
                        //   backgroundColor: "purple",
                        top: "1em",
                        width: "2em",
                        height: "2em"
                        }
                    }}

                    settings={{
                        min: 30,
                        max: 120,
                        step: 10,
                        onChange: (value: number) => {
                            setRoundTime(value)
                        }
                    }}
                />
                <br />
                <Label ribbon size="large" color="blue">
                    Penalty for skipping a word
                </Label>
                <Checkbox
                    checked={skipPenalty}
                    toggle
                    onChange={() => setSkipPenalty(!skipPenalty)}
                />
            </Segment>
        </div>
    )
}

export default NewGame
