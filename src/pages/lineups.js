import React, { useEffect, useState } from "react";
import CustomHeader from "../components/customeHeader";
import soccerTeamNames from "../../teams";
import soccerPlayers from "../../players";
import CustomeTableRowOffensive from "../components/CustomeTableRowOffensive";
import CustomeTableRowDefensive from "../components/CustomeTableRowDefensive";
import CustomeTableRowGoalies from "../components/CustomeTableRowGoalies";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  Box,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Button,
} from "@mui/material";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

const Lineups = () => {
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("./");
    }
  }, []);
  const Teams = [
    {
      name: "Anaheim Ducks",
      label: "ANA",
      code: "24",
    },
    {
      name: "Arizona Coyotes",
      label: "ARI",
      code: "53",
    },
    {
      name: "Boston Bruins",
      label: "BOS",
      code: "6",
    },
    {
      name: "Buffalo Sabres",
      label: "BUF",
      code: "7",
    },
    {
      name: "Carolina Hurricanes",
      label: "CAR",
      code: "12",
    },
    {
      name: "Calgary Flames",
      label: "CGY",
      code: "20",
    },
    {
      name: "Chicago Blackhawks",
      label: "CHI",
      code: "16",
    },
    {
      name: "Columbus Blue Jackets",
      label: "CBJ",
      code: "29",
    },
    {
      name: "Colorado Avalanche",
      label: "COL",
      code: "21",
    },
    {
      name: "Dallas Stars",
      label: "DAL",
      code: "25",
    },
    {
      name: "Detroit Red Wings",
      label: "DET",
      code: "17",
    },
    {
      name: "Edmonton Oilers",
      label: "EDM",
      code: "22",
    },
    {
      name: "Florida Panthers",
      label: "FLA",
      code: "13",
    },
    {
      name: "Los Angeles Kings",
      label: "LAK",
      code: "26",
    },
    {
      name: "Minnesota Wild",
      label: "MIN",
      code: "30",
    },
    {
      name: "Montréal Canadiens",
      label: "MTL",
      code: "8",
    },
    {
      name: "Nashville Predators",
      label: "NSH",
      code: "18",
    },
    {
      name: "New Jersey Devils",
      label: "NJD",
      code: "1",
    },
    {
      name: "New York Islanders",
      label: "NYI",
      code: "2",
    },
    {
      name: "New York Rangers",
      label: "NYR",
      code: "3",
    },
    {
      name: "Ottawa Senators",
      label: "OTT",
      code: "9",
    },
    {
      name: "Philadelphia Flyers",
      label: "PHI",
      code: "4",
    },
    {
      name: "Phoenix Coyotes",
      label: "PHX",
      code: "53",
    },
    {
      name: "Pittsburgh Penguins",
      label: "PIT",
      code: "5",
    },
    {
      name: "San Jose Sharks",
      label: "SJS",
      code: "28",
    },
    {
      name: "St. Louis Blues",
      label: "STL",
      code: "19",
    },
    {
      name: "Tampa Bay Lightning",
      label: "TBL",
      code: "14",
    },
    {
      name: "Toronto Maple Leafs",
      label: "TOR",
      code: "10",
    },
    {
      name: "Vancouver Canucks",
      label: "VAN",
      code: "23",
    },
    {
      name: "Vegas Golden Knights",
      label: "VGK",
      code: "54",
    },
    {
      name: "Winnipeg Jets",
      label: "WPG",
      code: "52",
    },
    {
      name: "Washington Capitals",
      label: "WSH",
      code: "15",
    },
    {
      name: "Seattle Kraken",
      label: "SEA",
      code: "55",
    },
  ];
  const [selectedTeam, setSelectedTeam] = React.useState("");
  const [allTeams, setAllTeams] = React.useState([]);
  const [allPlayers, setAllPlayer] = React.useState([]);
  const [offensive, setOffensive] = React.useState([]);
  const [defensive, setDefensive] = React.useState([]);
  const [goalie, setGoalie] = React.useState([]);
  const router = useRouter();
  const [draggedItem, setDraggedItem] = useState(null);
  const [tableDataOffensive, setTableDataOffensive] = useState([
    { LW: "", C: "", RW: "" },
    { LW: "", C: "", RW: "" },
    { LW: "", C: "", RW: "" },
    { LW: "", C: "", RW: "" },
  ]);
  const [tableDataDefensive, setTableDataDefensive] = useState([
    { LD: "", RD: "" },
    { LD: "", RD: "" },
    { LD: "", RD: "" },
  ]);
  const [tableDataIstPowerplay, setTableDataIstPowerplay] = useState([
    { LW: "", C: "", RW: "" },
  ]);
  const [tableDataIstPowerplayLDRD, setTableDataIstPowerplayLDRD] = useState([
    { LD: "", RD: "" },
  ]);
  const [tableData2ndPowerplay, setTableData2ndPowerplay] = useState([
    { LW: "", C: "", RW: "" },
  ]);
  const [tableData2ndPowerplayLDRD, setTableData2ndPowerplayLDRD] = useState([
    { LD: "", RD: "" },
  ]);
  const [tableDataGoalie, setTableDataGoalie] = useState([{ SG: "", BG: "" }]);
  console.log("tableData2ndPowerplayLDRD", tableData2ndPowerplayLDRD);
  useEffect(() => {
    if (allPlayers.length > 0) {
      const offensivePlayers = [];
      const defensivePlayers = [];
      const goliePlayer = [];
      allPlayers.forEach((item) => {
        if (
          item.position.type === "Forward" ||
          item.position.type === "forward"
        ) {
          offensivePlayers.push(item.person.fullName);
        } else if (
          item.position.type === "Defenseman" ||
          item.position.type === "defenseman"
        ) {
          defensivePlayers.push(item.person.fullName);
        } else if (
          item.position.type === "Goalie" ||
          item.position.type === "goalie"
        ) {
          goliePlayer.push(item.person.fullName);
        }
      });
      setOffensive(offensivePlayers);
      setDefensive(defensivePlayers);
      setGoalie(goliePlayer);
    }
  }, [allPlayers]);

  const handleChange = (event) => {
    const selectedTeamName = event.target.value;
    setSelectedTeam(selectedTeamName);

    const selectedTeamObject = Teams.find((team) => {
      return team.name === selectedTeamName;
    });
    console.log("selectedTeamName>>>1", selectedTeamObject);

    if (selectedTeamObject) {
      const selectedTeamCode = selectedTeamObject.code;
      api
        .getTeamPlayers(selectedTeamCode)
        .then((res) => {
          console.log("frontEnd", res.data.roster);
          setAllPlayer(res.data.roster);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };

  useEffect(() => {
    api
      .getTeams()
      .then((res) => {
        setAllTeams(res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, position, rowIndex, targetState) => {
    e.preventDefault();

    const item = e.dataTransfer.getData("text/plain");
    if (targetState === "offensive") {
      setTableDataOffensive((prevTableData) => {
        const updatedTableData = [...prevTableData];
        updatedTableData[rowIndex][position] = item;
        return updatedTableData;
      });
    } else if (targetState === "defensive") {
      setTableDataDefensive((prevTableData) => {
        const updatedTableData = [...prevTableData];
        updatedTableData[rowIndex][position] = item;
        return updatedTableData;
      });
    } else if (targetState === "istPowerplay") {
      setTableDataIstPowerplay((prevTableData) => {
        const updatedTableData = [...prevTableData];
        updatedTableData[rowIndex][position] = item;
        return updatedTableData;
      });
    } else if (targetState === "istPowerplayLDRD") {
      setTableDataIstPowerplayLDRD((prevTableData) => {
        const updatedTableData = [...prevTableData];
        updatedTableData[rowIndex][position] = item;
        return updatedTableData;
      });
    } else if (targetState === "2ndPowerplay") {
      setTableData2ndPowerplay((prevTableData) => {
        const updatedTableData = [...prevTableData];
        updatedTableData[rowIndex][position] = item;
        return updatedTableData;
      });
    } else if (targetState === "2ndPowerplayLDRD") {
      setTableData2ndPowerplayLDRD((prevTableData) => {
        const updatedTableData = [...prevTableData];
        updatedTableData[rowIndex][position] = item;
        return updatedTableData;
      });
    } else if (targetState === "goalie") {
      setTableDataGoalie((prevTableData) => {
        const updatedTableData = [...prevTableData];
        updatedTableData[rowIndex][position] = item;
        return updatedTableData;
      });
    }
  };

  return (
    <>
      <CustomHeader />
      <Grid
        container
        sx={{
          maxWidth: "1300px",
          margin: "0 auto",
          marginTop: "80px",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginLeft: "2px",
            marginRight: "2px",
          }}
          item
          lg={2}
          md={2}
          sm={12}
          xs={12}
        >
          <Typography sx={{ mb: 1 }}>Select Team</Typography>
          <FormControl sx={{ width: "150px" }}>
            <InputLabel id="demo-simple-select-label">Teams</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedTeam}
              label="Teams"
              onChange={handleChange}
            >
              {allTeams.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", md: "none", lg: "block" } }}
        />

        <Grid
          sx={{
            display: "flex",
            m: "0 auto",
            marginTop: { sm: 5, xs: 5, md: 0 },
          }}
          item
          lg={9}
          md={9}
          sm={12}
          xs={12}
        >
          <Grid sx={{ width: "100%" }}>
            {/* Offensive Line */}
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", mr: 2, mb: 2 }}
            >
              <Button sx={{ mr: 2 }} variant="contained">
                Reset
              </Button>
              <Button variant="contained" startIcon={<DeleteIcon />}>
                Trash
              </Button>
            </Box>
            <Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
              OFFENSIVE LINE
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {offensive.map((item) => {
                return (
                  <Card
                    key={item} // Make sure to add a unique key for each element in the list
                    sx={{
                      minWidth: 200,
                      p: 1,
                      m: 1,
                      textAlign: "center",
                      "@media (max-width: 600px)": {
                        minWidth: "100px",
                        // padding: "0.5rem",
                      },
                    }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, item)}
                  >
                    <Typography sx={{ fontSize: 14 }}>{item}</Typography>
                  </Card>
                );
              })}
            </Box>

            <TableContainer component={Paper}>
              <Table sx={{ border: "1px solid #152b55" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#152b55", color: "#fff" }}>
                    <TableCell
                      sx={{
                        color: "#fff",
                        textAlign: "center",
                        border: "1px solid #152b55",
                      }}
                    >
                      LW
                    </TableCell>
                    <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                      C
                    </TableCell>
                    <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                      RW
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableDataOffensive.map((rowData, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell
                        onDragOver={handleDragOver}
                        onDrop={(e) =>
                          handleDrop(e, "LW", rowIndex, "offensive")
                        }
                        sx={{
                          border: "1px solid #152b55",
                          textAlign: "center",
                        }}
                      >
                        {rowData.LW}
                      </TableCell>
                      <TableCell
                        onDragOver={handleDragOver}
                        onDrop={(e) =>
                          handleDrop(e, "C", rowIndex, "offensive")
                        }
                        sx={{
                          border: "1px solid #152b55",
                          textAlign: "center",
                        }}
                      >
                        {rowData.C}
                      </TableCell>
                      <TableCell
                        onDragOver={handleDragOver}
                        onDrop={(e) =>
                          handleDrop(e, "RW", rowIndex, "offensive")
                        }
                        sx={{
                          border: "1px solid #152b55",
                          textAlign: "center",
                        }}
                      >
                        {rowData.RW}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Defensive Line */}
            <Typography variant="h6" sx={{ mb: 1, textAlign: "center", mt: 5 }}>
              DEFENSIVE LINE
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {defensive.map((item) => {
                return (
                  <Card
                    key={item} // Make sure to add a unique key for each element in the list
                    sx={{
                      minWidth: 200,
                      p: 1,
                      m: 1,
                      textAlign: "center",
                      "@media (max-width: 600px)": {
                        minWidth: "auto",
                        padding: "0.5rem",
                      },
                    }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, item)}
                  >
                    <Typography sx={{ fontSize: 14 }}>{item}</Typography>
                  </Card>
                );
              })}
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ border: "1px solid #152b55" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#152b55", color: "#fff" }}>
                    <TableCell
                      sx={{
                        color: "#fff",
                        textAlign: "center",
                        border: "1 px solid #152b55",
                      }}
                    >
                      LD
                    </TableCell>
                    <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                      RD
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableDataDefensive.map((rowData, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell
                        onDragOver={handleDragOver}
                        onDrop={(e) =>
                          handleDrop(e, "LD", rowIndex, "defensive")
                        }
                        sx={{
                          border: "1px solid #152b55",
                          textAlign: "center",
                        }}
                      >
                        {rowData.LW}
                      </TableCell>
                      <TableCell
                        onDragOver={handleDragOver}
                        onDrop={(e) =>
                          handleDrop(e, "RD", rowIndex, "defensive")
                        }
                        sx={{
                          border: "1px solid #152b55",
                          textAlign: "center",
                        }}
                      >
                        {rowData.C}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* First PowerPlay unit */}
            <Typography variant="h6" sx={{ mb: 1, textAlign: "center", mt: 5 }}>
              1ST POWERPLAY UNIT
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {allPlayers.map((item) => (
                <Card
                  key={item.person.id}
                  sx={{
                    minWidth: 200,
                    p: 1,
                    m: 1,
                    textAlign: "center",
                    "@media (max-width: 600px)": {
                      minWidth: "auto",
                      padding: "0.5rem",
                    },
                  }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.person.fullName)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, item.person.fullName)}
                >
                  <Typography sx={{ fontSize: 14 }}>
                    {item.person.fullName}
                  </Typography>
                </Card>
              ))}
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ border: "1px solid #152b55" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#152b55", color: "#fff" }}>
                    <TableCell
                      sx={{
                        color: "#fff",
                        textAlign: "center",
                        border: "1 px solid #152b55",
                      }}
                    >
                      LW
                    </TableCell>
                    <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                      C
                    </TableCell>
                    <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                      RW
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableDataIstPowerplay.map((rowData, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell
                        onDragOver={handleDragOver}
                        onDrop={(e) =>
                          handleDrop(e, "LW", rowIndex, "istPowerplay")
                        }
                        sx={{
                          border: "1px solid #152b55",
                          textAlign: "center",
                        }}
                      >
                        {rowData.LW}
                      </TableCell>
                      <TableCell
                        onDragOver={handleDragOver}
                        onDrop={(e) =>
                          handleDrop(e, "C", rowIndex, "istPowerplay")
                        }
                        sx={{
                          border: "1px solid #152b55",
                          textAlign: "center",
                        }}
                      >
                        {rowData.C}
                      </TableCell>
                      <TableCell
                        onDragOver={handleDragOver}
                        onDrop={(e) =>
                          handleDrop(e, "RW", rowIndex, "istPowerplay")
                        }
                        sx={{
                          border: "1px solid #152b55",
                          textAlign: "center",
                        }}
                      >
                        {rowData.RW}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer sx={{ mt: 1 }} component={Paper}>
              <Table sx={{ border: "1px solid #152b55" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#152b55", color: "#fff" }}>
                    <TableCell
                      sx={{
                        color: "#fff",
                        textAlign: "center",
                        border: "1 px solid #152b55",
                      }}
                    >
                      LD
                    </TableCell>
                    <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                      RD
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableDataIstPowerplayLDRD.map((rowData, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell
                        onDragOver={handleDragOver}
                        onDrop={(e) =>
                          handleDrop(e, "LD", rowIndex, "istPowerplayLDRD")
                        }
                        sx={{
                          border: "1px solid #152b55",
                          textAlign: "center",
                        }}
                      >
                        {rowData.LD}
                      </TableCell>
                      <TableCell
                        onDragOver={handleDragOver}
                        onDrop={(e) =>
                          handleDrop(e, "RD", rowIndex, "istPowerplayLDRD")
                        }
                        sx={{
                          border: "1px solid #152b55",
                          textAlign: "center",
                        }}
                      >
                        {rowData.RD}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Second Powerplay unit */}
            <Typography variant="h6" sx={{ mb: 1, textAlign: "center", mt: 5 }}>
              2nd POWERPLAY UNIT
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {allPlayers.map((item) => (
                <Card
                  key={item.person.id}
                  sx={{
                    minWidth: 200,
                    p: 1,
                    m: 1,
                    textAlign: "center",
                    "@media (max-width: 600px)": {
                      minWidth: "auto",
                      padding: "0.5rem",
                    },
                  }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.person.fullName)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, item.person.fullName)}
                >
                  <Typography sx={{ fontSize: 14 }}>
                    {item.person.fullName}
                  </Typography>
                </Card>
              ))}
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ border: "1px solid #152b55" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#152b55", color: "#fff" }}>
                    <TableCell
                      sx={{
                        color: "#fff",
                        textAlign: "center",
                        border: "1 px solid #152b55",
                      }}
                    >
                      LW
                    </TableCell>
                    <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                      C
                    </TableCell>
                    <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                      RW
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData2ndPowerplay.map((rowData, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell
                        onDragOver={handleDragOver}
                        onDrop={(e) =>
                          handleDrop(e, "LW", rowIndex, "2ndPowerplay")
                        }
                        sx={{
                          border: "1px solid #152b55",
                          textAlign: "center",
                        }}
                      >
                        {rowData.LW}
                      </TableCell>
                      <TableCell
                        onDragOver={handleDragOver}
                        onDrop={(e) =>
                          handleDrop(e, "C", rowIndex, "2ndPowerplay")
                        }
                        sx={{
                          border: "1px solid #152b55",
                          textAlign: "center",
                        }}
                      >
                        {rowData.C}
                      </TableCell>
                      <TableCell
                        onDragOver={handleDragOver}
                        onDrop={(e) =>
                          handleDrop(e, "RW", rowIndex, "2ndPowerplay")
                        }
                        sx={{
                          border: "1px solid #152b55",
                          textAlign: "center",
                        }}
                      >
                        {rowData.RW}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer sx={{ mt: 1 }} component={Paper}>
              <Table sx={{ border: "1px solid #152b55" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#152b55", color: "#fff" }}>
                    <TableCell
                      sx={{
                        color: "#fff",
                        textAlign: "center",
                        border: "1 px solid #152b55",
                      }}
                    >
                      LD
                    </TableCell>
                    <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                      RD
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData2ndPowerplayLDRD.map((rowData, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell
                        onDragOver={handleDragOver}
                        onDrop={(e) =>
                          handleDrop(e, "LD", rowIndex, "2ndPowerplayLDRD")
                        }
                        sx={{
                          border: "1px solid #152b55",
                          textAlign: "center",
                        }}
                      >
                        {rowData.LD}
                      </TableCell>
                      <TableCell
                        onDragOver={handleDragOver}
                        onDrop={(e) =>
                          handleDrop(e, "RD", rowIndex, "2ndPowerplayLDRD")
                        }
                        sx={{
                          border: "1px solid #152b55",
                          textAlign: "center",
                        }}
                      >
                        {rowData.RD}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Goalies */}
            <Typography variant="h6" sx={{ mb: 1, textAlign: "center", mt: 5 }}>
              GOALIES
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {goalie.map((item) => {
                return (
                  <Card
                    key={item} // Make sure to add a unique key for each element in the list
                    sx={{
                      minWidth: 200,
                      p: 1,
                      m: 1,
                      textAlign: "center",
                      "@media (max-width: 600px)": {
                        minWidth: "auto",
                        padding: "0.5rem",
                      },
                    }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, item)}
                  >
                    <Typography sx={{ fontSize: 14 }}>{item}</Typography>
                  </Card>
                );
              })}
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ border: "1px solid #152b55" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#152b55", color: "#fff" }}>
                    <TableCell
                      sx={{
                        color: "#fff",
                        textAlign: "center",
                        border: "1 px solid #152b55",
                      }}
                    >
                      Starting Goalie
                    </TableCell>
                    <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                      Backup Goalie
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableDataGoalie.map((rowData, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, "SG", rowIndex, "goalie")}
                        sx={{
                          border: "1px solid #152b55",
                          textAlign: "center",
                        }}
                      >
                        {rowData.SG}
                      </TableCell>
                      <TableCell
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, "BG", rowIndex, "goalie")}
                        sx={{
                          border: "1px solid #152b55",
                          textAlign: "center",
                        }}
                      >
                        {rowData.BG}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" sx={{ mb: 1, textAlign: "center", mt: 5 }}>
              INJURIES
            </Typography>
            <Table sx={{ border: "1px solid #152b55" }}>
              <TableBody>
                <CustomeTableRowGoalies />
                <CustomeTableRowGoalies />
                <CustomeTableRowGoalies />
              </TableBody>
            </Table>
            <Box sx={{ display: "flex", alignItems: "center", mt: 3, mb: 5 }}>
              <Typography variant="subtitle1">
                Starting Goalie Position:
              </Typography>
              <FormControl sx={{ ml: 1, width: "20%" }}>
                <InputLabel id="demo-simple-select-label">
                  Starting Goalie Position
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedTeam}
                  label="Starting Goalie Position"
                  onChange={handleChange}
                >
                  <MenuItem key="starting" value="Starting">
                    Starting
                  </MenuItem>
                  <MenuItem key="expected" value="Expected">
                    Expected
                  </MenuItem>
                  <MenuItem key="not confirmed" value="Not Confirmed">
                    Not Confirmed
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Lineups;
