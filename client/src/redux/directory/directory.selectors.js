import { createSelector} from "reselect";

const selectDirectory = state =>state.directory;

export const SelectDirectorySections = createSelector(
    [selectDirectory],
    directory=>directory.sections
);