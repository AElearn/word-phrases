import React, { useState, useEffect } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import phrasesData from "../stage1.json";

const DisplayInfo = (props) => {
	const { lesson, setStage } = props;
	return (
		<>
			<br />
			<br />
			<div className="text-center">
				<h1>Keyword:</h1>
				<h1 className="red">{phrasesData[lesson].keyword}</h1>
				<br />
				<ListGroup>
					{phrasesData[lesson].phrases.map((phrase) => (
						<ListGroup.Item key={phrase}>
							<h5>{phrase}</h5>
						</ListGroup.Item>
					))}
				</ListGroup>
				<br />
				<Button variant="success" onClick={() => setStage(2)}>
					NEXT STAGE
				</Button>
			</div>
		</>
	);
};
export default DisplayInfo;
