import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox'



type CreateItemFormProps = {
	onCreateItem: (title: string) => void,
}

export const CreateItemForm = ({onCreateItem}: CreateItemFormProps) => {
	const [itemTitle, setItemTitle] = useState('')
	const [error, setError] = useState<string | null>(null)
	
	
	// Create item function
	const createItemHandler = () => {
		const trimmedTitle = itemTitle.trim()
		if (trimmedTitle !== '') {
			onCreateItem(trimmedTitle)
			setItemTitle('')
		} else {
			setError('Title is required')
		}
	}
	
	// Change item title
	const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setItemTitle(event.currentTarget.value)
		setError(null)
	}
	
	const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			createItemHandler()
		}
	}
	
	return (
		<div>
			<TextField
				label='Enter a title'
				variant='outlined'
				size='small'
				error={!!error}
				helperText={error}
				value={itemTitle}
				onChange={changeItemTitleHandler}
				onKeyDown={createItemOnEnterHandler}/>
			<IconButton onClick={createItemHandler} color='primary'>
				<AddBoxIcon/>
			</IconButton>
			
		</div>
	);
};
