import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const TabMenuDemo = () => {

    const [activeIndex, setActiveIndex] = useState(3);

    const navigate = useNavigate();

    const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home', path:"/home"},
        {label: 'Calendar', icon: 'pi pi-fw pi-calendar', path:"/calendar"},
        // {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
        // {label: 'Documentation', icon: 'pi pi-fw pi-file'},
        {label: 'Configurar token', icon: 'pi pi-fw pi-cog', path:"/token"}
    ];

    const redirectPath = ({index, value}) => {
        setActiveIndex(index)
        navigate(value.path);
    }

    return (
        <div className="card">
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => redirectPath(e)} />
        </div>
    );
}

export default TabMenuDemo;