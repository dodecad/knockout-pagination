/* A control to provide customisable pagination. */
class PaginationModel {

    /* Determines whether to display the first/last buttons. */
    FullMode: boolean;

    /* Number of items displayed on each page. */
    ItemsPerPage: number;

    /* How many maximum page numbers should be visible while navigating. */
    MaxDisplayedPages: number;

    /* Function to call when a page number is changed. */
    OnPageClick: Function;

    /* The selected page number. */
    SelectedPageNumber = ko.observable<number>();

    /* Total number of items that will be used to calculate the pages. */
    TotalCount = ko.observable<number>();

    /* Creates a new instance of the Pagination class. */
    constructor(params: PaginationParams) {

        this.FullMode = params.FullMode;
        this.ItemsPerPage = params.ItemsPerPage;
        this.MaxDisplayedPages = params.MaxDisplayedPages;
        this.OnPageClick = params.OnPageClick;
        this.SelectedPageNumber = params.SelectedPageNumber;
        this.TotalCount = params.TotalCount;
    }

    /* Determines whether a control contains any elements. */
    Any = () => {
        return this.TotalCount() > 0;
    };

    /* Navigates to the page based on page number. */
    ChangePage = (pageNumber: number) => {
        this.SelectedPageNumber(pageNumber);
        this.OnPageClick.call(this);
    };

    /* Determines whether the control has more pages. */
    HasNext = (): boolean => {
        return this.SelectedPageNumber() < this.PagesCount();
    };

    /* Determines whether the control has less pages. */
    HasPrevious = (): boolean => {
        return this.SelectedPageNumber() > 1;
    };

    /* Indicates whether the page is selected. */
    IsActive = (pageNumber: number): boolean => {
        return this.SelectedPageNumber() === pageNumber;
    };

    /* Indicates whether the page is visible. */
    IsVisible = (pageNumber: number): boolean => {

        // How many page numbers are visible at the beginning/ending of the pagination:
        var edge: number = this.MaxDisplayedPages / 2;

        var minimumPageNumber: number = this.SelectedPageNumber() - edge;
        var maximumPageNumber: number = this.MaxDisplayedPages + minimumPageNumber;

        return pageNumber > minimumPageNumber && pageNumber < maximumPageNumber;
    };

    /* Navigates to the next page. */
    NextPage = () => {
        this.SelectedPageNumber(this.SelectedPageNumber() + 1);
        this.OnPageClick.call(this);
    };

    /* Returns the total number of pages. */
    PagesCount = (): number => {
        return Math.floor((this.TotalCount() + this.ItemsPerPage - 1) / this.ItemsPerPage);
    };

    /* Navigates to the previous page. */
    PreviousPage = () => {
        this.SelectedPageNumber(this.SelectedPageNumber() - 1);
        this.OnPageClick.call(this);
    };
}

/* The parameters that are passed to the component. */
interface PaginationParams {

    /* Determines whether to display the first/last buttons. */
    FullMode: boolean;

    /* Number of items displayed on each page. */
    ItemsPerPage: number;

    /* How many maximum page numbers should be visible while navigating. */
    MaxDisplayedPages: number;

    /* Function to call when a page number is changed. */
    OnPageClick: Function;

    /* The selected page number. */
    SelectedPageNumber: KnockoutObservable<number>;

    /* Total number of items that will be used to calculate the pages. */
    TotalCount: KnockoutObservable<number>;
}

/* Export the class for use with require.js */
export = PaginationModel;