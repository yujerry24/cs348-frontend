import * as React from 'react';
import './Cell.scss';

export default function Cell({
  content,
  header,
  headerKey = ''
}) {
  const headerName = "Cell Cel-header " + headerKey;
  const cellMarkup = header ? (
    <th className={headerName}>
      {content}
    </th>
  ) : (
    <>
      <td className="Cell">
        {content}
      </td>
    </>
  );

  return (cellMarkup);
}