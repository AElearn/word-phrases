import { Button, Form, ListGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import readingData from "../stage3.json";

const ReadingGame = (props) => {
	const { lesson, setStage } = props;
	const matchInfo = readingData[lesson];

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
		let allCorrect = true;
		for (let i = 0; i < matchInfo.answers.length; i++) {
			if (matchInfo.answers[i] !== selectedOptions[i]) {
				allCorrect = false;
			}
		}

		setSelectedSnapshot(selectedOptions);

		if (allCorrect) {
			setShowNextStageButton(true);
		}
	};

	return (
		<>
			<div className="text-center blue font-bold">
				<br />
				<div>Please choose the correct idioms and phrases.</div>
			</div>

			<div className="text-left reading">
				{matchInfo.conversations.map((conversation, index) => {
					return (
						<div key={index}>
							<span>
								{Object.keys(selectedSnapshot).length > 0 &&
									(selectedSnapshot[index] === matchInfo.answers[index]
										? "✅ "
										: "❌ ")}
								{`${index + 1}.)`}
							</span>
							<div className="text-left">
								{conversation.split("\n").map((line, index) => (
									<div key={index}>
										{line}
										<br />
									</div>
								))}
							</div>

							<br />
							<Form>
								<div key={`inline-radio`} className="mb-3">
									{matchInfo.phrases.map((phrase, index2) => {
										return (
											<Form.Check
												disabled={showNextStageButton}
												key={index2}
												label={phrase}
												value={index2}
												name="group1"
												type="radio"
												id={`inline-${index}-${index2}`}
												checked={selectedOptions[index] === index2}
												onChange={() => handleOptionChange(index, index2)}
											/>
										);
									})}
								</div>
							</Form>
							<br />
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
					<>
						<h6 className="green">🎉 ALL CORRECT 🎉</h6>
					</>
				)}
				<br />
				<br />
				<br />
			</div>
		</>
	);
};

export default ReadingGame;
