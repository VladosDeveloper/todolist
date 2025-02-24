import {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type EditableSpanProps = {
	value: string
	onChange: (title: string) => void
}

export const EditableSpan = ({value, onChange}: EditableSpanProps) => {
	const [edit, setEdit] = useState<boolean>(false)
	const [inputText, setInputText] = useState<string>(value)
	
	const turnEditMode = () => {
		setEdit(true)
	}
	
	const turnOffEditMode = () => {
		setEdit(false)
		onChange(inputText)
	}
	
	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const typedText = e.currentTarget.value
		setInputText(typedText)
		
	}
	
	return (
		<>
			{edit
				? <TextField
					variant='outlined'
					value={inputText}
					size='small'
					type="text"
					autoFocus
					onBlur={turnOffEditMode}
					onChange={onChangeInputHandler}
				/>
				: <span onDoubleClick={turnEditMode}>{value}</span>
			}
		
		</>
	)
};
