package com.gi.project.controller;

import com.gi.project.security.CurrentUser;
import com.gi.project.security.UserPrincipal;
import com.gi.project.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class FileUploadController {
    private final FileUploadService fileUploadService;

    @Autowired
    public FileUploadController(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @PostMapping("/file")
    public String handleFileUpload(@CurrentUser UserPrincipal currentUser, @RequestParam("file") MultipartFile multipartFile) {
        if (!multipartFile.getContentType().equals("application/octet-stream"))
            throw new IllegalArgumentException("Wrong file format");
        try {
            fileUploadService.saveFileData(currentUser, multipartFile);
        } catch (IOException e) {
            e.printStackTrace();
            return e.getMessage();
        }
        return "File saved successfully";
    }

}
