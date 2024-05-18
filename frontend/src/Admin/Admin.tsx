import React, {useState, useEffect, useContext, useCallback} from 'react';
import axiosInstance from "../Axios/axiosInstance";
import AuthContext from "../Context/AuthProvider";
import {Card, CardContent, Typography, Grid, Container, Button, ButtonGroup, Box} from '@mui/material';

const Admin: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('PENDING');
    const authContext = useContext(AuthContext) || null;

    useEffect(() => {
        if (!authContext) {
            throw new Error("AuthContext must be used within an AuthProvider");
        }

        fetchUsersByStatus(selectedStatus);
    }, [authContext, selectedStatus]);

    //DO NOT TOUCH - fetchUsersByStatus function to fetch users by status
    const fetchUsersByStatus = useCallback((status: string) => {
        axiosInstance.get('http://localhost:8081/users/by-status', {
            auth: {
                username: authContext!.auth?.username || '',
                password: authContext!.auth?.password || ''
            },
            params: {status}
        })
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [authContext]);

    useEffect(() => {
        fetchUsersByStatus(selectedStatus);
    }, [authContext, selectedStatus, fetchUsersByStatus]);

    //DO NOT TOUCH - handleApprove function to handle the approval of a user
    const handleApprove = (id: number) => {
        axiosInstance.put(`http://localhost:8081/users/approve-company`, {}, {
            params: {id},
            auth: {
                username: authContext?.auth?.username || '',
                password: authContext?.auth?.password || ''
            }
        })
            .then((response) => {
                fetchUsersByStatus(selectedStatus);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //DO NOT TOUCH - handleReject function to handle the rejection of a user
    const handleReject = (id: number) => {
        axiosInstance.put(`http://localhost:8081/users/decline-company`, {}, {
            params: {id},
            auth: {
                username: authContext?.auth?.username || '',
                password: authContext?.auth?.password || ''
            }
        })
            .then((response) => {
                fetchUsersByStatus(selectedStatus);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Container
            style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
            }
            }
        >
            <Container
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}

            >
                <Container
                    style={{
                        marginTop: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}

                >
                    <Typography variant="h3" align="center" gutterBottom>
                        Here's your admin dashboard,
                    </Typography>
                    <Typography variant="h2" align="center" gutterBottom>
                        {authContext?.auth?.username}
                    </Typography>
                </Container>
                <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                    style={{
                        flexDirection: 'row',
                        alignItems: 'space-evenly',
                        margin: 'auto',
                        marginBottom: '10px',
                    }}
                >
                    <Button aria-label="contained primary button"
                            variant="contained"
                            onClick={() => fetchUsersByStatus(selectedStatus)}
                            style={{
                                maxWidth: '100px',
                                display: 'flex',
                                padding: '10px',
                                color: 'white',
                            }
                            }>Refresh</Button>
                    <Button aria-label="contained primary button"
                            variant="contained"

                        // !DO NOT TOUCH - Logout button, allowed to be modified for styling ONLY
                            onClick={() =>
                                axiosInstance.get('http://localhost:8081/logout', {}).then(
                                    (response) => {
                                        authContext?.setAuth(null);
                                        window.location.href = '/login';
                                        console.log(response.data)
                                    }
                                )
                            }
                            style={{
                                maxWidth: '100px',
                                display: 'flex',
                                padding: '10px',
                                color: 'white',
                            }
                            }>Logout</Button>
                </ButtonGroup>

                <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{
                    marginBottom: '20px',
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 'auto',
                }}>
                    <Button onClick={() => setSelectedStatus('BASE')}>Base</Button>
                    <Button onClick={() => setSelectedStatus('PENDING')}>Pending</Button>
                    <Button onClick={() => setSelectedStatus('REJECTED')}>Rejected</Button>
                    <Button onClick={() => setSelectedStatus('APPROVED')}>Accepted</Button>
                </ButtonGroup>

            </Container>
            <Grid container spacing={1}
                  style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '20px',
                      minHeight: '500px',
                      minWidth: '500px',
                      maxWidth: '1000px',
                      maxHeight: '800px',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-evenly',
                  }}

            >
                {users.map((user) => (
                    <Grid item
                          spacing={3}
                          style={{
                              display: 'flex',
                              marginRight: '10px',
                              minHeight: '200px',
                              minWidth: '100px',
                              maxWidth: '400px',

                          }}

                          xs={12} sm={8} md={10} lg={8} key={user.id}>
                        <Card variant="outlined"
                              style={{
                                  minWidth: '400px',
                                  minHeight: '100px',
                                  display: 'flex',
                                  flexDirection: 'column',
                              }}
                        >
                            <CardContent
                                style={
                                    {
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }
                                }
                            >
                                <Typography variant="h5" component="div">
                                    {user.username}
                                </Typography>
                                <Typography color="text.secondary">
                                    Role: {user.role}
                                </Typography>
                                <Typography color="text.secondary">
                                    Status: {user.status}
                                </Typography>
                                {user.status === 'PENDING' && (
                                    <Box mt={2} display="flex" justifyContent="center"
                                         style={{
                                             display: "flex", justifyContent: "center", alignItems: "center"
                                         }}

                                    >
                                        <Button
                                            variant="contained"
                                            style={{
                                                backgroundColor: 'green',
                                                color: 'white',
                                                padding: '10px',
                                                margin: '5px'
                                            }}
                                            onClick={() => handleApprove(user.id)}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            variant="contained"
                                            style={{
                                                backgroundColor: 'red',
                                                color: 'white',
                                                padding: '10px',
                                                margin: '5px'
                                            }}
                                            onClick={() => handleReject(user.id)}
                                        >
                                            Reject
                                        </Button>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Admin;
