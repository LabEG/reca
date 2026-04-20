import styled from "@emotion/styled";

export const DRAWER_WIDTH = 280;

export const MainContent = styled("main", {
    shouldForwardProp: (prop) => prop !== "drawerWidth"
})<{drawerWidth: number}>`
    flex-grow: 1;
    padding: 40px 48px;
    margin-top: 64px;
    min-height: calc(100vh - 64px);

    @media (min-width: 900px) {
        margin-left: ${({drawerWidth}) => drawerWidth}px;
    }

    @media (max-width: 600px) {
        padding: 24px 16px;
    }
`;

export const LogoWrapper = styled("div")`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
`;
