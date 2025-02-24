import {styled, Theme} from "@mui/material";
import Button from "@mui/material/Button";

type Props = {
	background?: string
	theme?: Theme
}

export const NavButton = styled(Button)<Props>(({background, theme}) => ({
	minWidth: '100px',
	fontWeight: 'bold',
	boxShadow: `0 0 3px 2px ${theme.palette.primary.dark}, 4px 4px 2px 0 ${theme.palette.primary.dark}`,
	borderRadius: '5px',
	textTransform: 'capitalize',
	margin: '10px 10px',
	padding: '8px 24px',
	color: `${theme.palette.primary.contrastText}`,
	background: background || theme.palette.primary.light,
}))