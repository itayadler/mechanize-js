'use strict';
/**
 * Initialize a new `History`.
 * @api public
 */

exports.newHistory = () => {
  const pages = [];
  let theCurrentPage = null;

  const push = page => {
    pages.push(page);
    theCurrentPage = page;
  };

  const currentPage = () => theCurrentPage;

  return Object.freeze({
    push,
    currentPage
  });
};
