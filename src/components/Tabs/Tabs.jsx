import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./Tabs.scss";
import TableAdmin from "../TableAdmin/TableAdmin";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/usersAction";
import { Button, useMediaQuery } from "@mui/material";
import TableUsers from "../TableUsers/TableUsers";
import TableRequests from "../TableReques/TableRequest";

const useStyles = makeStyles((theme) => ({
  tab: {
    "&.Mui-selected": {
      color: "green",
    },
    "&:hover": {
      color: "green",
    },
  },
  tabs: {
    "& .MuiTabs-indicator": {
      backgroundColor: "green",
    },
  },
}));

const MyTab = (props) => {
  const classes = useStyles();

  return (
    <Tab
      sx={{
        "&.Mui-selected": { color: "green" },
        "&:hover": { color: "green" },
        "&.MuiTabs-indicator": {
          backgroundColor: "green", // Замените на желаемый цвет для линии справа от табов
        },
      }}
      {...props}
    />
  );
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="tabPanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const isSmallScreen = useMediaQuery("(max-width: 1200px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
      }}
    >
      <Tabs
        orientation={isSmallScreen ? "horizontal" : "vertical"}
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <MyTab label="Местоположение" {...a11yProps(0)} />
        <MyTab label="Пользователи" {...a11yProps(1)} />
        <MyTab label="Заявки" {...a11yProps(2)} />
      </Tabs>
      <Box sx={{ flex: 1 }}>
        <TabPanel value={value} index={0}>
          <TableAdmin />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableUsers />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TableRequests />
        </TabPanel>
      </Box>
    </Box>
  );
}
