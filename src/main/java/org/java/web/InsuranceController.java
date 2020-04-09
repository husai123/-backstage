package org.java.web;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class InsuranceController {

    //先进跳转页面
    @GetMapping("/item")
    public String init() {
        return "item";
    }

    @GetMapping("/forward/{target}")
    public String forward(@PathVariable("target") String target){
        return  "/"+target;
    }

}
