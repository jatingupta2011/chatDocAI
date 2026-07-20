package com.chatdoc.backend;

import org.springframework.ai.model.chat.client.autoconfigure.ChatClientAutoConfiguration;
import org.springframework.ai.model.openai.autoconfigure.OpenAiEmbeddingAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.chatdoc.backend.config.ChatDocProperties;

@SpringBootApplication(
    exclude = {
        ChatClientAutoConfiguration.class,
        // OpenAiEmbeddingAutoConfiguration.class
    }
)
@EnableConfigurationProperties(ChatDocProperties.class)
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
