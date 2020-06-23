export const saveRootProposition = (rootProposition = {}) => {
    return {
        type: 'SAVE_ROOT_PROPOSITION',
        rootProposition
    }
}
