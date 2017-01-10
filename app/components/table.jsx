import React from 'react';
import styled from 'styled-components';

import { table } from '../theme';

const rowStyles = `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
`;
const colStyles = `
  flex: 3;
  text-align: center;
  border-right: 1px solid ${table.cell.borderColor};
`;
export const Table = styled.div`
  display: flex;
  flex-direction: column;
`;
export const TableHeader = styled.div`
  ${rowStyles}
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${table.header.borderColor};
  background-color: ${table.header.backgroundColor};
`;
export const TableHeaderCol = styled.div`
  ${colStyles}
  font-weight: 500;
`;
export const TableBody = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;
export const TableBodyRow = styled.li`
  ${rowStyles}
  background-color: ${({ backgroundColor }) => (backgroundColor)};
`;
export const TableBodyCol = styled.div`${colStyles}`;
