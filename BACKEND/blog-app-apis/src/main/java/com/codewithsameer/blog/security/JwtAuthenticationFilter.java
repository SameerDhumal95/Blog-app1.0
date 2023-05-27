//package com.codewithsameer.blog.security;
//
//import java.io.IOException;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import io.jsonwebtoken.ExpiredJwtException;
//import io.jsonwebtoken.MalformedJwtException;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//@Component
//public class JwtAuthenticationFilter extends OncePerRequestFilter{
//
//	@Autowired
//	private UserDetailsService UserDetailsService;
//	@Autowired
//	private JwtTokenHelper jwtTokenHelper;
//	
//	@Override
//	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//			throws ServletException, IOException {
//		
//		//1.get token
//		String requestToken = request.getHeader("Authorization");
//		
//		//Bearer  2352523sdgsg
//		
//		System.out.println(requestToken);
//		
//		String username = null;
//		
//		String token = null;
//		// JWT Token is in the form "Bearer token". Remove Bearer word and get
//		// only the Token
//		if (requestToken != null && requestToken.startsWith("Bearer"))
//		{
//			
//			token = requestToken.substring(7);
//			try {
//				username = this.jwtTokenHelper.getUsernameFromToken(token);
//			} 
//			catch (IllegalArgumentException e) {
//				System.out.println("Unable to get JWT Token");
//			} 
//			catch (ExpiredJwtException e) {
//				System.out.println("JWT Token has expired");
//			}
//			catch(MalformedJwtException e)
//			{
//				System.out.println("Invalid Jwt");
//			}
//		}
//		else 
//		{
//			System.out.println("JWT Token does not begin with Bearer String");
//		}
//		// Once we get the token validate it.
//		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null)
//		{
//			UserDetails userDetails = this.UserDetailsService.loadUserByUsername(username);
//			// if token is valid configure Spring Security to manually set
//			// authentication
//			if (this.jwtTokenHelper.validateToken(token, userDetails)) 
//			{
//				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
//						userDetails, null, userDetails.getAuthorities());
//				
//				usernamePasswordAuthenticationToken
//						.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//				// After setting the Authentication in the context, we specify
//				// that the current user is authenticated. So it passes the
//				// Spring Security Configurations successfully.
//				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//			}
//			
//			else
//			{
//				System.out.println("Invalid jwt token");
//			}
//		}
//		else
//		{
//			System.out.println("username is null or context is not null");
//		}
//		
//	    
//		filterChain.doFilter(request, response);
//		
//	}
//}
