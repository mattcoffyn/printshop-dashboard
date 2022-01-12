import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, DataTableSkeleton, Pagination } from 'carbon-components-react';

import RepoTable from '../components/RepoTable';

const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'createdAt',
    header: 'Created',
  },
  {
    key: 'updatedAt',
    header: 'Updated',
  },
  {
    key: 'issueCount',
    header: 'Open Issues',
  },
  {
    key: 'stars',
    header: 'Stars',
  },
  {
    key: 'links',
    header: 'Links',
  },
];

// const rows = [
//   {
//     id: '1',
//     name: 'Repo 1',
//     createdAt: 'Date',
//     updatedAt: 'Date',
//     issueCount: '123',
//     stars: '456',
//     links: 'Links',
//   },
//   {
//     id: '2',
//     name: 'Repo 2',
//     createdAt: 'Date',
//     updatedAt: 'Date',
//     issueCount: '123',
//     stars: '456',
//     links: 'Links',
//   },
//   {
//     id: '3',
//     name: 'Repo 3',
//     createdAt: 'Date',
//     updatedAt: 'Date',
//     issueCount: '123',
//     stars: '456',
//     links: 'Links',
//   },
// ];

const REPO_QUERY = gql`
  query REPO_QUERY {
    # Let's use carbon as our organization
    organization(login: "carbon-design-system") {
      # We'll grab all the repositories in one go. To load more resources
      # continuously, see the advanced topics.
      repositories(first: 75, orderBy: { field: UPDATED_AT, direction: DESC }) {
        totalCount
        nodes {
          url
          homepageUrl
          issues(filterBy: { states: OPEN }) {
            totalCount
          }
          stargazers {
            totalCount
          }
          releases(first: 1) {
            totalCount
            nodes {
              name
            }
          }
          name
          updatedAt
          createdAt
          description
          id
        }
      }
    }
  }
`;

const LinkList = ({ url, homepageUrl }) => (
  <ul style={{ display: 'flex' }}>
    <li>
      <Link href={url}>GitHub</Link>
    </li>
    {homepageUrl && (
      <li>
        <span>&nbsp;|&nbsp;</span>
        <Link href={homepageUrl}>Homepage</Link>
      </li>
    )}
  </ul>
);

const getRowItems = (rows) =>
  rows.map((row) => ({
    ...row,
    key: row.id,
    stars: row.stargazers.totalCount,
    issueCount: row.issues.totalCount,
    createdAt: new Date(row.createdAt).toLocaleDateString(),
    updatedAt: new Date(row.updatedAt).toLocaleDateString(),
    links: <LinkList url={row.url} homepageUrl={row.homepageUrl} />,
  }));

const RepoPage = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const { data, loading, error } = useQuery(REPO_QUERY);

  if (error) {
    console.error(error);
    return null;
  }

  if (loading) {
    return (
      <div className="repo-skeleton">
        <DataTableSkeleton
          columnCount={headers.length + 1}
          rowCount={10}
          headers={headers}
        />
        ;
      </div>
    );
  }

  const { repositories } = data.organization;
  const rows = getRowItems(repositories.nodes);

  return (
    <div className="bx--grid bx--grid--full-width bx--grid--no-gutter repo-page">
      <div className=" repo-page__r1">
        <RepoTable
          headers={headers}
          rows={rows.slice(firstRowIndex, firstRowIndex + currentPageSize)}
        />
        <Pagination
          totalItems={repositories.nodes.length}
          backwardText="Previous page"
          forwardText="Next page"
          pageSize={currentPageSize}
          pageSizes={[5, 10, 15, 25]}
          itemsPerPageText="Items per page"
          onChange={({ page, pageSize }) => {
            if (pageSize !== currentPageSize) {
              setCurrentPageSize(pageSize);
            }
            setFirstRowIndex(pageSize * (page - 1));
          }}
        />
      </div>
    </div>
  );
};

export default RepoPage;