package com.chatdoc.backend;

import org.springframework.ai.model.chat.client.autoconfigure.ChatClientAutoConfiguration;
import org.springframework.ai.model.openai.autoconfigure.OpenAiEmbeddingAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
    exclude = {
        ChatClientAutoConfiguration.class,
        OpenAiEmbeddingAutoConfiguration.class
    }
)

public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
