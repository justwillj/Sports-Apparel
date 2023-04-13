import React from 'react';
import './paginationInterface.css';
import { ButtonGroup, Button } from '@material-ui/core';

/**
 * @name PaginationInterface
 * @description - this component builds the UI for ProductPagination
 * @param startIndex - used to display what items are being shown
 * @param totalProducts - used to display how many products are available
 * @param prevButton - function to go to previous page, used in PREV button onClick
 * @param nextButton - function to go to next page, used in NEXT button onClick
 * @returns - UI for ProductPagination
 */
const PaginationInterface = ({
  startIndex,
  totalProducts,
  prevButton,
  nextButton
}) => (
  <div className="pageInterface">
    <span>{`${startIndex + 1} - ${startIndex + 20 > totalProducts ? totalProducts : startIndex + 20} out of ${totalProducts}`}</span>
    <ButtonGroup variant="text" aria-label="top button group">
      {startIndex > 0 && <Button onClick={prevButton}>{'< PREV'}</Button>}
      {startIndex < (totalProducts - 20) && <Button onClick={nextButton}>{'NEXT >'}</Button>}
    </ButtonGroup>
  </div>
);

export default PaginationInterface;
