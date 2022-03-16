const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [{
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'Gráficas', url: 'grafica1' },
                { titulo: 'Progress Bar', url: 'progress' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'RxJs', url: 'rxjs' }
            ]
        }

    ];

    if (role === 'USER_ROLE') {
        menu.push({
            titulo: 'Llistes',
            icono: 'mdi mdi-folder-lock',
            submenu: [
                { titulo: 'Dades alumnes', url: 'user/alumnes' },
                { titulo: 'Assistència', url: 'user/assistencia' }
            ]
        });
    }

    if (role === 'ADMIN_ROLE') {
        menu.push({
            titulo: 'Administrador',
            icono: 'mdi mdi-folder-lock',
            submenu: [
                { titulo: 'Mestres', url: 'admin/mestres' },
                { titulo: 'Alumnes', url: 'admin/alumnes' }
            ]
        });
    }

    if (role === 'SUPER_ROLE') {
        menu.push({
            titulo: 'Super',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                { titulo: 'Centres', url: 'super/centres' },
                { titulo: 'Mestres', url: 'super/mestres' },
                { titulo: 'Alumnes', url: 'super/alumnes' }
            ]
        });
    }
    const menuJson = JSON.stringify(menu);
    // console.log(menuJson);
    return menuJson;
};

module.exports = {
    getMenuFrontEnd
};