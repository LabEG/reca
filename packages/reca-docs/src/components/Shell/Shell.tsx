"use client";

import {type JSX, type ReactNode, useState} from "react";
import {
    AppBar,
    Box,
    Collapse,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GitHubIcon from "@mui/icons-material/GitHub";
import {styled} from "styled-components";
import {type INavGroup, navigation} from "../../navigation.js";

const DRAWER_WIDTH = 280;

const MainContent = styled("main")<{$drawerWidth: number}>`
    flex-grow: 1;
    padding: 40px 48px;
    margin-top: 64px;
    min-height: calc(100vh - 64px);

    @media (min-width: 900px) {
        margin-left: ${({$drawerWidth}) => $drawerWidth}px;
    }

    @media (max-width: 600px) {
        padding: 24px 16px;
    }
`;

const LogoWrapper = styled("div")`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
`;

interface IShellProps {
    readonly children: ReactNode;
    readonly currentPath: string;
    readonly onNavigate: (path: string) => void;
}

export const Shell = ({children, currentPath, onNavigate}: IShellProps): JSX.Element => {
    const muiTheme = useTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        for (const group of navigation) {
            initial[group.label] = true;
        }

        return initial;
    });

    const handleDrawerToggle = (): void => {
        setMobileOpen((prev) => !prev);
    };

    const handleSectionToggle = (label: string): void => {
        setOpenSections((prev) => ({...prev, [label]: !prev[label]}));
    };

    const handleNavigate = (path: string): void => {
        onNavigate(path);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    const drawerContent = (
        <Box sx={{mt: "64px", overflowY: "auto", py: 1}}>
            <List component="nav" disablePadding>
                {navigation.map((group: INavGroup) => (
                    <Box key={group.label}>
                        <ListItemButton
                            onClick={() => handleSectionToggle(group.label)}
                            sx={{py: 0.8, px: 2.5}}
                        >
                            <ListItemText
                                primary={group.label}
                                slotProps={{
                                    primary: {
                                        sx: {
                                            fontWeight: 700,
                                            fontSize: "0.75rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.08em",
                                            color: "text.secondary"
                                        }
                                    }
                                }}
                            />
                            {openSections[group.label]
                                ? <ExpandLess fontSize="small" />
                                : <ExpandMore fontSize="small" />}
                        </ListItemButton>
                        <Collapse in={openSections[group.label]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {group.items.map((item) => (
                                    <ListItemButton
                                        key={item.path}
                                        onClick={() => handleNavigate(item.path)}
                                        selected={currentPath === item.path}
                                        sx={{
                                            pl: 4,
                                            py: 0.5,
                                            "&.Mui-selected": {
                                                backgroundColor: "rgba(25, 118, 210, 0.08)",
                                                borderRight: "3px solid #1976d2",
                                                "& .MuiListItemText-primary": {
                                                    color: "#1976d2",
                                                    fontWeight: 600
                                                }
                                            }
                                        }}
                                    >
                                        <ListItemText
                                            primary={item.label}
                                            slotProps={{
                                                primary: {
                                                    sx: {fontSize: "0.9rem"}
                                                }
                                            }}
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    </Box>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{display: "flex"}}>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: muiTheme.zIndex.drawer + 1,
                    backgroundColor: "#fff",
                    color: "#333",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)"
                }}
            >
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{mr: 1}}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <LogoWrapper onClick={() => handleNavigate("overview")}>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{fontWeight: 800, color: "#1976d2"}}
                        >
                            ReCA
                        </Typography>
                        <Typography
                            variant="body2"
                            noWrap
                            sx={{color: "#999", fontWeight: 400}}
                        >
                            Documentation
                        </Typography>
                    </LogoWrapper>
                    <Box sx={{flexGrow: 1}} />
                    <IconButton
                        component="a"
                        href="https://github.com/LabEG/reca"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{color: "#555"}}
                    >
                        <GitHubIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {isMobile
                ? (
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{keepMounted: true}}
                        sx={{
                            "& .MuiDrawer-paper": {
                                width: DRAWER_WIDTH,
                                boxSizing: "border-box"
                            }
                        }}
                    >
                        {drawerContent}
                    </Drawer>
                )
                : (
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: DRAWER_WIDTH,
                            flexShrink: 0,
                            "& .MuiDrawer-paper": {
                                width: DRAWER_WIDTH,
                                boxSizing: "border-box",
                                borderRight: "1px solid #f0f0f0"
                            }
                        }}
                        open
                    >
                        {drawerContent}
                    </Drawer>
                )}

            <MainContent $drawerWidth={DRAWER_WIDTH}>
                {children}
            </MainContent>
        </Box>
    );
};
