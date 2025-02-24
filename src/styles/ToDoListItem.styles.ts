import {SxProps} from "@mui/material";


export const containerSx: SxProps = {display: 'flex', justifyContent: 'space-between'}

export const getIsDonValue = (isDone: boolean): SxProps =>({
	p: 0,
	justifyContent: 'space-between',
	opacity: isDone ? .5 : 1
})