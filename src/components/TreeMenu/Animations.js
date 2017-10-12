export default {
    toggle: ({node: {toggled}}) => ({
        // animation: {rotateZ: toggled ? 90 : 0},
        duration: 3000
    }),
    drawer: (/* props */) => ({
        enter: {
            animation: 'slideDown',
            duration: 300
        },
        leave: {
            animation: 'slideUp',
            duration: 300
        }
    })
};
