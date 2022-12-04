import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    root: {
        padding: '1.25rem 0 1.25rem 0'
    },
    ul: {
        justifyContent: 'center',
        "& .MuiPaginationItem-root": {
            color: "#cecece",
            borderColor: "rgba(255, 255, 255, 0.23)"
        }
    }
}));

export default useStyles;