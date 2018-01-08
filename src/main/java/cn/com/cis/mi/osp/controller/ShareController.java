package cn.com.cis.mi.osp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by tangwenpei on 16/3/28.
 */
@Controller
public class ShareController {


    @RequestMapping(value = "/share/paging", method = RequestMethod.GET)
    public ModelAndView paging() throws Exception {
        return new ModelAndView("/share/paging");
    }

}
