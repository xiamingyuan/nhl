package cn.com.cis.mi.osp.common;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by zhouxiaolong on 16/11/25.
 */
public class Menu {
    private String url;
    private String name;
    private String menuClass;
    private List<Menu> subMenu = new ArrayList<Menu>();

    public Menu(){}

    public Menu(String url, String name){
        this.url=url;
        this.name=name;
    }
    public Menu(String url, String name, String menuClass){
        this.url=url;
        this.name=name;
        this.menuClass=menuClass;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMenuClass() {
        return menuClass;
    }

    public void setMenuClass(String menuClass) {
        this.menuClass = menuClass;
    }

    public List<Menu> getSubMenu() {
        return subMenu;
    }

    public void setSubMenu(List<Menu> subMenu) {
        this.subMenu = subMenu;
    }

    public void addSubMenu(Menu menu){
        subMenu.add(menu);
    }
}
