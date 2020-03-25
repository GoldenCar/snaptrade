// @flow

import { createSelector } from 'redux-orm';
import orm, { dbStateSelector } from '.';

// // orm is an instance of ORM
// const tickerSelector = createSelector(
//   orm,
//   (session, tickerSymbol: TickerSymbol) =>
//     session.Book.map(book =>
//       Object.assign({}, book.ref, {
//         authors: book.authors.map(author => author.name),
//         genres: book.genres.map(genre => genre.name),
//       }),
//     ),
// );
