import styled ,{css} from "styled-components";

/* const test = css`text-align:center`; */

const H1 = styled.h1`
  ${(props)=>
    props.type === "h1" &&
    css`
        font-size: 3rem;
        font-weight: 600;
    `
}
line-height:1.6rem;
padding:3rem;
`;

export default H1;