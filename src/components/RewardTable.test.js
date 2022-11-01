import { render } from "@testing-library/react";
import RewardTable from "./RewardTable";

const mockDataTable = [
  {
    value: 50,
    date: "2021-01-11T06:22:49",
    userId: 1,
  },
  {
    value: 10,
    date: "2021-01-08T22:00:30",
    userId: 1,
  },

  {
    value: 100,
    date: "2021-01-09T22:28:41",
    userId: 3,
  },
  {
    value: 120,
    date: "2021-01-07T01:49:13",
    userId: 3,
  },
  {
    value: 100,
    date: "2021-01-15T14:34:20",
    userId: 2,
  },

  {
    value: 500,
    date: "2021-02-17T11:47:47",
    userId: 2,
  },
  {
    value: 36,
    date: "2021-01-02T18:57:37",
    userId: 1,
  },
  {
    value: 49,
    date: "2021-02-19T15:37:58",
    userId: 2,
  },
  {
    value: 35,
    date: "2021-03-27T14:29:15",
    userId: 2,
  },
  {
    value: 50,
    date: "2021-03-21T10:37:09",
    userId: 3,
  },
  {
    value: 45,
    date: "2021-03-11T07:02:40",
    userId: 3,
  },
  {
    value: 99,
    date: "2021-03-04T22:43:01",
    userId: 1,
  },
];

describe("Reward Table", () => {
  it("Should match the snapshot", () => {
    const { asFragment } = render(
      <RewardTable loading={false} transactionData={mockDataTable} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render the table", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrappedComponent = render(
      <RewardTable loading={false} transactionData={mockDataTable} />
    );
    expect(wrappedComponent).not.toBeNull();
    // expect to render 2 tables: 1 contains transactions and respective reward points, 1 contains the total points calculated
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(wrappedComponent.queryAllByTestId("table").length).toEqual(2);
  });

  it("Shouldn't render the table when loading is true (i.e, transactions data is not yet ready)", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const { getByText } = render(
      <RewardTable loading={true} transactionData={mockDataTable} />
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const loadingText = getByText("Table is waiting for data...");
    expect(loadingText).toBeTruthy();
  });
});
