import styled from "@emotion/styled";

export const DRAWER_WIDTH = 280;

/* AppBar (Toolbar) height: 56px on xs, 64px on sm+ */
export const TOOLBAR_HEIGHT_MOBILE = 56;
export const TOOLBAR_HEIGHT_DESKTOP = 64;

export const MainContent = styled("main", {
    shouldForwardProp: (prop) => prop !== "drawerWidth"
})<{drawerWidth: number}>`
    flex-grow: 1;
    /* min-width: 0 prevents flex child from overflowing its container */
    min-width: 0;
    max-width: 100%;
    overflow-x: hidden;
    padding: 40px 48px;
    margin-top: ${TOOLBAR_HEIGHT_DESKTOP}px;
    min-height: calc(100vh - ${TOOLBAR_HEIGHT_DESKTOP}px);

    @media (min-width: 900px) {
        margin-left: ${({drawerWidth}) => drawerWidth}px;
    }

    /* Tablet: 600px – 899px */
    @media (min-width: 600px) and (max-width: 899px) {
        padding: 28px 32px;
        margin-top: ${TOOLBAR_HEIGHT_DESKTOP}px;
        min-height: calc(100vh - ${TOOLBAR_HEIGHT_DESKTOP}px);
    }

    /* Mobile: < 600px */
    @media (max-width: 599px) {
        padding: 20px 16px;
        margin-top: ${TOOLBAR_HEIGHT_MOBILE}px;
        min-height: calc(100vh - ${TOOLBAR_HEIGHT_MOBILE}px);
    }
`;

export const LogoWrapper = styled("div")`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
`;
