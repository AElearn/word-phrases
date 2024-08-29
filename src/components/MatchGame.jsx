import { Button, Form, ListGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import matchData from "../stage2.json";

const MatchGame = (props) => {
	const { lesson, setStage } = props;
	const matchInfo = matchData[lesson];

	const [showNextStageButton, setShowNextStageButton] = useState(false);

	const [selectedOptions, setSelectedOptions] = useState({});

	const handleOptionChange = (groupIndex, optionValue) => {
		setSelectedOptions((prevSelectedOptions) => ({
			...prevSelectedOptions,
			[groupIndex]: optionValue,
		}));
	};

	const [selectedSnapshot, setSelectedSnapshot] = useState({});

	const onSubmit = () => {
		const answers = matchInfo.answers;
		let allCorrect = true;
		for (let i = 0; i < answers.length; i++) {
			if (Array.isArray(answers[i])) {
				for (let j = 0; j < answers[i].length; j++) {
					if (answers[i][j] === selectedOptions[i]) {
						break;
					}
				}
				allCorrect = false;
				break;
			} else {
				if (answers[i] !== selectedOptions[i]) {
					allCorrect = false;
					break;
				}
			}
		}

		setSelectedSnapshot(selectedOptions);

		if (allCorrect) {
			setShowNextStageButton(true);
		}
	};

	return (
		<>
			<br />
			<div className="text-center m-2 blue font-bold">
				<h6>Match the phrases with their meanings.</h6>
			</div>
			<div className="m-4">
				{matchInfo.meanings.map((meaning, index) => {
					return <div key={index}>{meaning}</div>;
				})}
			</div>
			<div className="m-4">
				{matchInfo.phrases.map((phrase, index) => {
					return (
						<div key={index}>
							<span>
								{Object.keys(selectedSnapshot).length > 0 &&
									(selectedSnapshot[index] === matchInfo.answers[index] ||
									(Array.isArray(matchInfo.answers[index]) &&
										matchInfo.answers[index].filter(
											(a) => a === selectedSnapshot[index]
										).length > 0)
										? "✅ "
										: "❌ ")}
								{index + 1}. {phrase}
							</span>
							<Form>
								<div key={`inline-radio`} className="mb-3">
									{matchInfo.answers.map((answer, index2) => {
										const letter = String.fromCharCode(65 + index2);
										return (
											<Form.Check
												inline
												disabled={showNextStageButton}
												key={letter}
												label={letter}
												value={letter}
												name="group1"
												type="radio"
												id={`inline-${index}-${letter}`}
												checked={selectedOptions[index] === letter}
												onChange={() => handleOptionChange(index, letter)}
											/>
										);
									})}
								</div>
							</Form>
						</div>
					);
				})}
			</div>
			<div className="text-center">
				{!showNextStageButton && (
					<Button
						disabled={
							Object.keys(selectedOptions).length != matchInfo.answers.length
						}
						className="align-middle d-inline-flex p-2"
						onClick={() => onSubmit()}
					>
						Submit
					</Button>
				)}
				{showNextStageButton && (
					<Button variant="success" onClick={() => setStage(3)}>
						NEXT STAGE
					</Button>
				)}
			</div>
		</>
	);
};

export default MatchGame;
