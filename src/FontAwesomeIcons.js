import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const StyledPlayIcon = styled(FontAwesomeIcon)`
  color: #333; /* Regular color */
  transition: color 0.3s; /* Smooth transition for color change */
    font-size: 1.8rem;
`;

const SendContainer = styled.button`
  &:hover ${StyledPlayIcon} {
    color: white; /* Change color of icon when the container is hovered */
    animation: ${bounceAnimation} 1s forwards; /* Apply animation when hovered */
  }
  
`;

export { StyledPlayIcon, SendContainer };