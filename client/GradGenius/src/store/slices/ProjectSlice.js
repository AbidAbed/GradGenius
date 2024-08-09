import {createSlice} from '@reduxjs/toolkit';

const ProjectsSlices = createSlice({
  name: 'ProjectsSlice',
  initialState: [],
  reducers: {
    addProjects(state, action) {
      const mergedProjects = state.filter(project => {
        const foundProjectInAdded = action.payload.find(
          searchedProject => searchedProject._id === project._id,
        );
        if (foundProjectInAdded) return false;
        else return true;
      });

      return [...mergedProjects, ...action.payload];
    },
  },
});
const {addProjects} = ProjectsSlices.actions;
export {ProjectsSlices, addProjects};
